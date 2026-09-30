"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  type AdminAnalyticsData,
  loadAdminAnalyticsData,
} from "@/features/admin/admin-data.service";
import { getProductName } from "@/features/admin/admin-metrics";
import { DIAGNOSTIC_LABELS, USAGE_MODE_LABELS } from "@/features/diagnostics/labels";

export function DiagnosticsHistory() {
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAdminAnalyticsData()
      .then(setData)
      .catch((err: Error) => setError(err.message));
  }, []);

  const rows = useMemo(() => {
    if (!data) {
      return [];
    }

    return [...data.diagnostics]
      .sort((a, b) => Date.parse(b.started_at) - Date.parse(a.started_at))
      .map((diagnostic) => {
        const result = data.results.find((candidate) => candidate.diagnostic_id === diagnostic.id);
        const recommendations = data.recommendations
          .filter((recommendation) => recommendation.diagnostic_id === diagnostic.id)
          .sort((a, b) => a.rank - b.rank);
        const hasConversion = data.conversions.some(
          (conversion) => conversion.diagnostic_id === diagnostic.id,
        );

        return {
          diagnostic,
          profile: result?.profile ?? "Non complete",
          products: recommendations.map((recommendation) => getProductName(recommendation.product_id)),
          hasConversion,
        };
      });
  }, [data]);

  return (
    <AdminShell title="Historique anonymise" subtitle="Aucune donnee personnelle cliente n&apos;est affichee.">
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>
      ) : null}
      {!data ? (
        <p className="text-[#6e695f]">Chargement de l&apos;historique...</p>
      ) : (
        <div className="overflow-hidden rounded-[1.5rem] border border-[#ded1bd] bg-[#fffaf1]">
          <div className="grid min-w-[920px] grid-cols-[1.1fr_1fr_0.8fr_1fr_2fr_0.8fr] gap-4 border-b border-[#eadfcd] px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#8b6f45]">
            <span>Date</span>
            <span>Univers</span>
            <span>Mode</span>
            <span>Profil</span>
            <span>Produits</span>
            <span>Vente</span>
          </div>
          <div className="overflow-x-auto">
            {rows.map((row) => (
              <Link
                href={`/admin/diagnostics/${row.diagnostic.id}`}
                key={row.diagnostic.id}
                className="grid min-w-[920px] grid-cols-[1.1fr_1fr_0.8fr_1fr_2fr_0.8fr] gap-4 border-b border-[#eadfcd] px-5 py-4 text-sm transition hover:bg-[#f8efdf]"
              >
                <span>{new Date(row.diagnostic.started_at).toLocaleString("fr-FR")}</span>
                <span>{DIAGNOSTIC_LABELS[row.diagnostic.diagnostic_type]}</span>
                <span>{USAGE_MODE_LABELS[row.diagnostic.usage_mode === "advisor" ? "advisor" : "self"]}</span>
                <span>{row.profile}</span>
                <span>{row.products.join(", ") || "Aucun"}</span>
                <span>{row.hasConversion ? "Oui" : "Non"}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
