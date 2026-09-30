# Environment variables

Create a local `.env.local` file from `.env.example`.

```bash
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

Only the public anon key is required by this MVP. Data access is protected by Supabase RLS policies in `supabase/migrations`.

No customer personal data is collected or stored.
