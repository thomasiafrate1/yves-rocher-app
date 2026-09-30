"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  type AdminAnalyticsData,
  loadAdminAnalyticsData,
} from "@/features/admin/admin-data.service";
import { calculateDashboardMetrics, formatPercent } from "@/features/admin/admin-metrics";

function KpiCard({ label, value }: { label: string; value: string | number }) {
  return (
    <article className="rounded-[1.5rem] border border-[#ded1bd] bg-[#fffaf1] p-6 shadow-[0_14px_40px_rgba(50,44,33,0.06)]">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6f45]">{label}</p>
      <p className="mt-4 text-4xl font-semibold text-[#24351f]">{value}</p>
    </article>
  );
}

function RankingList({ title, items }: { title: string; items: { label: string; count: number }[] }) {
  return (
    <article className="rounded-[1.5rem] border border-[#ded1bd] bg-[#fffaf1] p-6">
      <h2 className="text-xl font-semibold text-[#24351f]">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.length === 0 ? (
          <p className="text-sm text-[#6e695f]">Aucune donnee.</p>
        ) : (
          items.slice(0, 6).map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 border-b border-[#eadfcd] pb-3">
              <span className="text-sm font-medium text-[#53613f]">{item.label}</span>
              <span className="rounded-full bg-[#edf2df] px-3 py-1 text-sm font-semibold text-[#314b2c]">
                {item.count}
              </span>
            </div>
          ))
        )}
      </div>
    </article>
  );
}

export function AdminDashboard() {
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAdminAnalyticsData()
      .then(setData)
      .catch((err: Error) => setError(err.message));
  }, []);

  const metrics = data ? calculateDashboardMetrics(data) : null;

  return (
    <AdminShell title="Dashboard KPI" subtitle="Vue anonymisee des diagnostics realises.">
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>
      ) : null}
      {!metrics ? (
        <p className="text-[#6e695f]">Chargement des indicateurs...</p>
      ) : (
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="Diagnostics" value={metrics.totalDiagnostics} />
            <KpiCard label="Completes" value={metrics.completedDiagnostics} />
            <KpiCard label="Completion" value={formatPercent(metrics.completionRate)} />
            <KpiCard label="Conversion" value={formatPercent(metrics.conversionRate)} />
            <KpiCard label="Conversions" value={metrics.conversionsCount} />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <RankingList title="Diagnostics par univers" items={metrics.diagnosticsByUniverse} />
            <RankingList title="Profils les plus obtenus" items={metrics.topProfiles} />
            <RankingList title="Besoins les plus frequents" items={metrics.topNeeds} />
            <RankingList title="Produits les plus recommandes" items={metrics.topRecommendedProducts} />
          </div>
        </div>
      )}
    </AdminShell>
  );
}
