/** Parses JSON from ESP32 HTTP endpoint — volts preferred. */
export function parseVoltagePayload(data: unknown): number {
  if (typeof data === "number" && Number.isFinite(data)) return data;
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (typeof o.v === "number" && Number.isFinite(o.v)) return o.v;
    if (typeof o.voltage === "number" && Number.isFinite(o.voltage)) return o.voltage;
    if (typeof o.mv === "number" && Number.isFinite(o.mv)) return o.mv / 1000;
    if (typeof o.millivolts === "number" && Number.isFinite(o.millivolts)) return o.millivolts / 1000;
  }
  throw new Error("Expected JSON number or object with v, voltage, mv, or millivolts");
}
