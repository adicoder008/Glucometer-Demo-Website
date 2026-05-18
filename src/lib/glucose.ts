/**
 * Maps electrochemical sensor voltage to estimated glucose (mg/dL).
 * Calibration is illustrative — replace with device-specific calibration for production.
 */
export function convertVoltageToGlucose(voltage: number): number {
  const referenceVoltage = 0.352;
  const mgDlPerVolt = 605;
  const baselineMgDl = 72;
  const mgDl = (voltage - referenceVoltage) * mgDlPerVolt + baselineMgDl;
  return Math.round(Math.min(420, Math.max(45, mgDl)));
}

export type GlucoseZone = "low" | "normal" | "high";

export function glucoseZone(mgDl: number): GlucoseZone {
  if (mgDl < 70) return "low";
  if (mgDl <= 180) return "normal";
  return "high";
}

export function zoneLabel(zone: GlucoseZone): string {
  switch (zone) {
    case "low":
      return "Low";
    case "normal":
      return "Normal";
    case "high":
      return "High";
  }
}

/** mg/dL for charts/tooltips — at most four fractional digits. */
export function formatGlucoseMgDl(mgDl: number): string {
  return parseFloat(mgDl.toFixed(4)).toString();
}

/** Large hero readout — shorter width, max two fractional digits (within the ≤4 rule). */
export function formatGlucoseMgDlHero(mgDl: number): string {
  return parseFloat(mgDl.toFixed(2)).toString();
}
