create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'diagnostic_type') then
    create type public.diagnostic_type as enum ('face', 'hair', 'fragrance');
  end if;

  if not exists (select 1 from pg_type where typname = 'usage_mode') then
    create type public.usage_mode as enum ('autonomous', 'advisor');
  end if;

  if not exists (select 1 from pg_type where typname = 'diagnostic_status') then
    create type public.diagnostic_status as enum ('started', 'completed', 'abandoned');
  end if;
end
$$;

create table if not exists public.diagnostics (
  id uuid primary key default gen_random_uuid(),
  public_token uuid not null default gen_random_uuid(),
  diagnostic_type public.diagnostic_type not null,
  usage_mode public.usage_mode not null,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  status public.diagnostic_status not null default 'started',
  created_at timestamptz not null default now(),
  constraint diagnostics_public_token_unique unique (public_token),
  constraint diagnostics_completed_at_status_check check (
    (status = 'completed' and completed_at is not null)
    or (status <> 'completed')
  )
);

create table if not exists public.diagnostic_results (
  diagnostic_id uuid primary key references public.diagnostics(id) on delete cascade,
  profile text not null,
  scores jsonb not null default '{}'::jsonb,
  needs jsonb not null default '[]'::jsonb,
  recommendation_tags text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.diagnostic_answers (
  id uuid primary key default gen_random_uuid(),
  diagnostic_id uuid not null references public.diagnostics(id) on delete cascade,
  question_id text not null,
  option_id text not null,
  option_label text not null,
  created_at timestamptz not null default now(),
  constraint diagnostic_answers_unique_question unique (diagnostic_id, question_id)
);

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  diagnostic_id uuid not null references public.diagnostics(id) on delete cascade,
  product_id text not null,
  rank integer not null check (rank > 0),
  reason text not null,
  created_at timestamptz not null default now(),
  constraint recommendations_unique_product unique (diagnostic_id, product_id),
  constraint recommendations_unique_rank unique (diagnostic_id, rank)
);

create table if not exists public.conversions (
  id uuid primary key default gen_random_uuid(),
  diagnostic_id uuid not null references public.diagnostics(id) on delete cascade,
  product_id text not null,
  converted_at timestamptz not null default now(),
  quantity integer check (quantity is null or quantity > 0),
  amount numeric(10, 2) check (amount is null or amount >= 0),
  constraint conversions_unique_product unique (diagnostic_id, product_id)
);

create index if not exists diagnostics_type_idx on public.diagnostics (diagnostic_type);
create index if not exists diagnostics_status_idx on public.diagnostics (status);
create index if not exists diagnostics_completed_at_idx on public.diagnostics (completed_at);
create index if not exists diagnostic_results_profile_idx on public.diagnostic_results (profile);
create index if not exists recommendations_product_idx on public.recommendations (product_id);
create index if not exists conversions_product_idx on public.conversions (product_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists diagnostic_results_set_updated_at on public.diagnostic_results;
create trigger diagnostic_results_set_updated_at
before update on public.diagnostic_results
for each row execute function public.set_updated_at();

create or replace function public.complete_public_diagnostic(
  p_diagnostic_id uuid,
  p_public_token uuid,
  p_profile text,
  p_scores jsonb,
  p_needs jsonb,
  p_recommendation_tags text[],
  p_answers jsonb,
  p_recommendations jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from public.diagnostics
    where id = p_diagnostic_id
      and public_token = p_public_token
  ) then
    raise exception 'Invalid diagnostic token';
  end if;

  update public.diagnostics
  set status = 'completed',
      completed_at = coalesce(completed_at, now())
  where id = p_diagnostic_id
    and public_token = p_public_token;

  insert into public.diagnostic_results (
    diagnostic_id,
    profile,
    scores,
    needs,
    recommendation_tags
  )
  values (
    p_diagnostic_id,
    p_profile,
    coalesce(p_scores, '{}'::jsonb),
    coalesce(p_needs, '[]'::jsonb),
    coalesce(p_recommendation_tags, '{}'::text[])
  )
  on conflict (diagnostic_id) do update
  set profile = excluded.profile,
      scores = excluded.scores,
      needs = excluded.needs,
      recommendation_tags = excluded.recommendation_tags;

  insert into public.diagnostic_answers (
    diagnostic_id,
    question_id,
    option_id,
    option_label
  )
  select
    p_diagnostic_id,
    answer.question_id,
    answer.option_id,
    answer.option_label
  from jsonb_to_recordset(coalesce(p_answers, '[]'::jsonb)) as answer(
    question_id text,
    option_id text,
    option_label text
  )
  on conflict (diagnostic_id, question_id) do update
  set option_id = excluded.option_id,
      option_label = excluded.option_label;

  insert into public.recommendations (
    diagnostic_id,
    product_id,
    rank,
    reason
  )
  select
    p_diagnostic_id,
    recommendation.product_id,
    recommendation.rank,
    recommendation.reason
  from jsonb_to_recordset(coalesce(p_recommendations, '[]'::jsonb)) as recommendation(
    product_id text,
    rank integer,
    reason text
  )
  on conflict (diagnostic_id, product_id) do update
  set rank = excluded.rank,
      reason = excluded.reason;
end;
$$;

create or replace function public.mark_public_diagnostic_abandoned(
  p_diagnostic_id uuid,
  p_public_token uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.diagnostics
  set status = 'abandoned'
  where id = p_diagnostic_id
    and public_token = p_public_token
    and status = 'started';
end;
$$;

alter table public.diagnostics enable row level security;
alter table public.diagnostic_results enable row level security;
alter table public.diagnostic_answers enable row level security;
alter table public.recommendations enable row level security;
alter table public.conversions enable row level security;

drop policy if exists "anon can create diagnostics" on public.diagnostics;
create policy "anon can create diagnostics"
on public.diagnostics
for insert
to anon
with check (
  status = 'started'
  and completed_at is null
);

drop policy if exists "authenticated can create diagnostics" on public.diagnostics;
create policy "authenticated can create diagnostics"
on public.diagnostics
for insert
to authenticated
with check (
  status = 'started'
  and completed_at is null
);

drop policy if exists "authenticated can read diagnostics" on public.diagnostics;
create policy "authenticated can read diagnostics"
on public.diagnostics
for select
to authenticated
using (true);

drop policy if exists "authenticated can read diagnostic results" on public.diagnostic_results;
create policy "authenticated can read diagnostic results"
on public.diagnostic_results
for select
to authenticated
using (true);

drop policy if exists "authenticated can read diagnostic answers" on public.diagnostic_answers;
create policy "authenticated can read diagnostic answers"
on public.diagnostic_answers
for select
to authenticated
using (true);

drop policy if exists "authenticated can read recommendations" on public.recommendations;
create policy "authenticated can read recommendations"
on public.recommendations
for select
to authenticated
using (true);

drop policy if exists "authenticated can read conversions" on public.conversions;
create policy "authenticated can read conversions"
on public.conversions
for select
to authenticated
using (true);

drop policy if exists "authenticated can create conversions" on public.conversions;
create policy "authenticated can create conversions"
on public.conversions
for insert
to authenticated
with check (true);

revoke insert on public.diagnostics from anon, authenticated;
grant insert (
  id,
  public_token,
  diagnostic_type,
  usage_mode
) on public.diagnostics to anon, authenticated;
revoke select on public.diagnostics from authenticated;
grant select (
  id,
  diagnostic_type,
  usage_mode,
  started_at,
  completed_at,
  status,
  created_at
) on public.diagnostics to authenticated;
grant select on public.diagnostic_results to authenticated;
grant select on public.diagnostic_answers to authenticated;
grant select on public.recommendations to authenticated;
grant select, insert on public.conversions to authenticated;
revoke all on function public.complete_public_diagnostic(
  uuid,
  uuid,
  text,
  jsonb,
  jsonb,
  text[],
  jsonb,
  jsonb
) from public;
grant execute on function public.complete_public_diagnostic(
  uuid,
  uuid,
  text,
  jsonb,
  jsonb,
  text[],
  jsonb,
  jsonb
) to anon, authenticated;
revoke all on function public.mark_public_diagnostic_abandoned(uuid, uuid) from public;
grant execute on function public.mark_public_diagnostic_abandoned(uuid, uuid) to anon, authenticated;
