import { DIAGNOSTIC_LABELS, getNeedLabel } from "@/features/diagnostics/labels";
import { productsCatalog } from "@/features/products/catalog";
import type {
  AdminAnalyticsData,
} from "./admin-data.service";

export type CountItem = {
  label: string;
  count: number;
};

function productName(productId: string) {
  return productsCatalog.find((product) => product.id === productId)?.nom ?? productId;
}

function countBy(values: string[]): CountItem[] {
  const counts = values.reduce<Record<string, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function calculateDashboardMetrics(data: AdminAnalyticsData) {
  const totalDiagnostics = data.diagnostics.length;
  const completedDiagnostics = data.diagnostics.filter(
    (diagnostic) => diagnostic.status === "completed",
  ).length;
  const completionRate = totalDiagnostics > 0 ? completedDiagnostics / totalDiagnostics : 0;
  const conversionRate =
    data.recommendations.length > 0 ? data.conversions.length / data.recommendations.length : 0;

  return {
    totalDiagnostics,
    completedDiagnostics,
    completionRate,
    diagnosticsByUniverse: countBy(data.diagnostics.map((diagnostic) => DIAGNOSTIC_LABELS[diagnostic.diagnostic_type])),
    topProfiles: countBy(data.results.map((result) => result.profile)),
    topNeeds: countBy(data.results.flatMap((result) => result.needs.map((need) => getNeedLabel(need.tag)))),
    topRecommendedProducts: countBy(
      data.recommendations.map((recommendation) => productName(recommendation.product_id)),
    ),
    conversionsCount: data.conversions.length,
    conversionRate,
  };
}

export function getProductName(productId: string) {
  return productName(productId);
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}
