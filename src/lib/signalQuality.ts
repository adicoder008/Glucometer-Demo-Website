import type { VoltagePoint } from "../hooks/useGlucoseMonitor";

/** Maps recent voltage variance into a 0–1 quality score (higher is steadier). */
export function computeSignalQuality(series: VoltagePoint[]): number {
  if (series.length < 4) return 0.82;
  const slice = series.slice(-24).map((p) => p.v);
  const mean = slice.reduce((a, b) => a + b, 0) / slice.length;
  const variance = slice.reduce((acc, v) => acc + (v - mean) ** 2, 0) / slice.length;
  const sd = Math.sqrt(variance);
  const penalized = Math.max(0, 1 - sd * 95);
  return Math.min(1, 0.55 + penalized * 0.45);
}
