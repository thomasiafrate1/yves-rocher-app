"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  createConversion,
  type AdminAnalyticsData,
  loadAdminAnalyticsData,
} from "@/features/admin/admin-data.service";
import { getProductName } from "@/features/admin/admin-metrics";
import { DIAGNOSTIC_LABELS, getNeedLabel, USAGE_MODE_LABELS } from "@/features/diagnostics/labels";

type ConversionFormState = Record<string, { quantity: string; amount: string }>;

export function DiagnosticDetail() {
  const params = useParams<{ id: string }>();
  const diagnosticId = params.id;
  const [data, setData] = useState<AdminAnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [conversionForm, setConversionForm] = useState<ConversionFormState>({});
  const [isSaving, setIsSaving] = useState<string | null>(null);

  useEffect(() => {
    loadAdminAnalyticsData()
      .then(setData)
      .catch((err: Error) => setError(err.message));
  }, []);

  const detail = useMemo(() => {
    if (!data) {
      return null;
    }

    const diagnostic = data.diagnostics.find((candidate) => candidate.id === diagnosticId);

    if (!diagnostic) {
      return null;
    }

    return {
      diagnostic,
      result: data.results.find((candidate) => candidate.diagnostic_id === diagnosticId),
      answers: data.answers.filter((answer) => answer.diagnostic_id === diagnosticId),
      recommendations: data.recommendations
        .filter((recommendation) => recommendation.diagnostic_id === diagnosticId)
        .sort((a, b) => a.rank - b.rank),
      conversions: data.conversions.filter((conversion) => conversion.diagnostic_id === diagnosticId),
    };
  }, [data, diagnosticId]);

  async function markConverted(productId: string) {
    setIsSaving(productId);
    setError(null);

    try {
      const current = conversionForm[productId];
      await createConversion({
        diagnosticId,
        productId,
        quantity: current?.quantity ? Number(current.quantity) : null,
        amount: current?.amount ? Number(current.amount) : null,
      });
      setData(await loadAdminAnalyticsData());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur conversion.");
    } finally {
      setIsSaving(null);
    }
  }

  function updateConversionField(productId: string, field: "quantity" | "amount", value: string) {
    setConversionForm((current) => ({
      ...current,
      [productId]: {
        quantity: current[productId]?.quantity ?? "",
        amount: current[productId]?.amount ?? "",
        [field]: value,
      },
    }));
  }

  return (
    <AdminShell title="Detail diagnostic" subtitle={diagnosticId}>
      {error ? (
        <p className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>
      ) : null}
      {!data ? (
        <p className="text-[#6e695f]">Chargement du diagnostic...</p>
      ) : !detail ? (
        <p className="rounded-2xl border border-[#ded1bd] bg-[#fffaf1] p-6">Diagnostic introuvable.</p>
      ) : (
        <div className="grid gap-6">
          <section className="grid gap-4 rounded-[1.5rem] border border-[#ded1bd] bg-[#fffaf1] p-6 md:grid-cols-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b6f45]">Date</p>
              <p className="mt-2 font-semibold">{new Date(detail.diagnostic.started_at).toLocaleString("fr-FR")}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b6f45]">Univers</p>
              <p className="mt-2 font-semibold">{DIAGNOSTIC_LABELS[detail.diagnostic.diagnostic_type]}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b6f45]">Mode</p>
              <p className="mt-2 font-semibold">
                {USAGE_MODE_LABELS[detail.diagnostic.usage_mode === "advisor" ? "advisor" : "self"]}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b6f45]">Statut</p>
              <p className="mt-2 font-semibold">{detail.diagnostic.status}</p>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-[#ded1bd] bg-[#fffaf1] p-6">
            <h2 className="text-2xl font-semibold">Profil et scores</h2>
            {detail.result ? (
              <div className="mt-5 grid gap-5 lg:grid-cols-3">
                <div>
                  <p className="text-sm font-semibold text-[#8b6f45]">Profil</p>
                  <p className="mt-2 text-3xl font-semibold">{detail.result.profile}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#8b6f45]">Besoins</p>
                  <p className="mt-2 leading-7">
                    {detail.result.needs.map((need) => getNeedLabel(need.tag)).join(", ") || "Aucun"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#8b6f45]">Tags recommandation</p>
                  <p className="mt-2 leading-7">{detail.result.recommendation_tags.join(", ")}</p>
                </div>
                <pre className="overflow-x-auto rounded-2xl bg-[#f3eadb] p-4 text-sm lg:col-span-3">
                  {JSON.stringify(detail.result.scores, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="mt-4 text-[#6e695f]">Resultat non encore persiste.</p>
            )}
          </section>

          <section className="rounded-[1.5rem] border border-[#ded1bd] bg-[#fffaf1] p-6">
            <h2 className="text-2xl font-semibold">Reponses anonymisees</h2>
            <div className="mt-5 grid gap-3">
              {detail.answers.length === 0 ? (
                <p className="text-[#6e695f]">Aucune reponse persistee.</p>
              ) : (
                detail.answers.map((answer) => (
                  <div key={answer.id} className="rounded-2xl border border-[#eadfcd] p-4">
                    <p className="text-sm font-semibold text-[#8b6f45]">{answer.question_id}</p>
                    <p className="mt-1 text-lg font-semibold">{answer.option_label}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-[#ded1bd] bg-[#fffaf1] p-6">
            <h2 className="text-2xl font-semibold">Recommandations et conversions</h2>
            <div className="mt-5 grid gap-4">
              {detail.recommendations.map((recommendation) => {
                const converted = detail.conversions.find(
                  (conversion) => conversion.product_id === recommendation.product_id,
                );
                const formState = conversionForm[recommendation.product_id] ?? {
                  quantity: "",
                  amount: "",
                };

                return (
                  <article key={recommendation.id} className="rounded-2xl border border-[#eadfcd] p-5">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[#8b6f45]">Rang {recommendation.rank}</p>
                        <h3 className="mt-1 text-xl font-semibold">
                          {getProductName(recommendation.product_id)}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[#6e695f]">{recommendation.reason}</p>
                      </div>
                      {converted ? (
                        <span className="rounded-full bg-[#edf2df] px-4 py-2 text-sm font-semibold text-[#314b2c]">
                          Converti
                        </span>
                      ) : null}
                    </div>
                    {!converted ? (
                      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                        <input
                          type="number"
                          min="1"
                          placeholder="Quantite"
                          value={formState.quantity}
                          onChange={(event) =>
                            updateConversionField(recommendation.product_id, "quantity", event.target.value)
                          }
                          className="rounded-2xl border border-[#d8c9b1] bg-white px-4 py-3"
                        />
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Montant"
                          value={formState.amount}
                          onChange={(event) =>
                            updateConversionField(recommendation.product_id, "amount", event.target.value)
                          }
                          className="rounded-2xl border border-[#d8c9b1] bg-white px-4 py-3"
                        />
                        <button
                          type="button"
                          disabled={isSaving === recommendation.product_id}
                          onClick={() => markConverted(recommendation.product_id)}
                          className="rounded-full bg-[#314b2c] px-6 py-3 text-sm font-semibold text-[#fff8e8] disabled:opacity-50"
                        >
                          {isSaving === recommendation.product_id ? "..." : "Marquer vendu"}
                        </button>
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-[#6e695f]">
                        Vente enregistree le {new Date(converted.converted_at).toLocaleString("fr-FR")}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </AdminShell>
  );
}
