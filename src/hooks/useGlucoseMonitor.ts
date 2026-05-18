import { useCallback, useEffect, useRef, useState } from "react";
import { convertVoltageToGlucose, glucoseZone, type GlucoseZone } from "../lib/glucose";
import { parseVoltagePayload } from "../lib/parseVoltagePayload";
import { ema } from "../lib/signal";

export const STABILIZATION_MS = 60_000;
export const SAMPLE_INTERVAL_MS = 400;
const VOLTAGE_EMA_ALPHA = 0.28;
const GLUCOSE_DISPLAY_ALPHA = 0.07;
const CHART_MAX_POINTS = 90;

export type ConnectionState = "disconnected" | "connecting" | "connected";

export type VoltagePoint = { t: number; v: number };
export type GlucosePoint = { t: number; g: number };

function mockVoltage(elapsedMs: number): number {
  const base = 0.428;
  const drift = Math.sin(elapsedMs / 14000) * 0.0045;
  const ripple = Math.sin(elapsedMs / 2100) * 0.002;
  const noise = (Math.random() - 0.5) * 0.0065;
  return base + drift + ripple + noise;
}

function voltageUrlFromEnv(): string {
  return (import.meta.env.VITE_ESP32_VOLTAGE_URL ?? "").trim();
}

export function useGlucoseMonitor(enabled: boolean) {
  const startRef = useRef<number | null>(null);
  const smoothedVoltageRef = useRef<number | null>(null);
  const displayGlucoseRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);
  const httpInflightRef = useRef(false);

  const [connection, setConnection] = useState<ConnectionState>("disconnected");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [rawVoltage, setRawVoltage] = useState<number | null>(null);
  const [smoothedVoltage, setSmoothedVoltage] = useState<number | null>(null);
  const [instantGlucose, setInstantGlucose] = useState<number | null>(null);
  const [displayGlucose, setDisplayGlucose] = useState<number | null>(null);
  const [voltageSeries, setVoltageSeries] = useState<VoltagePoint[]>([]);
  const [glucoseSeries, setGlucoseSeries] = useState<GlucosePoint[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [httpLastError, setHttpLastError] = useState<string | null>(null);

  const stabilizationProgress = Math.min(1, elapsedMs / STABILIZATION_MS);
  const isSignalStable = elapsedMs >= STABILIZATION_MS;

  const zone: GlucoseZone | null =
    displayGlucose !== null ? glucoseZone(displayGlucose) : null;

  const reset = useCallback(() => {
    startRef.current = null;
    smoothedVoltageRef.current = null;
    displayGlucoseRef.current = null;
    lastTsRef.current = 0;
    httpInflightRef.current = false;
    setElapsedMs(0);
    setRawVoltage(null);
    setSmoothedVoltage(null);
    setInstantGlucose(null);
    setDisplayGlucose(null);
    setVoltageSeries([]);
    setGlucoseSeries([]);
    setLastUpdated(null);
    setHttpLastError(null);
    setConnection("disconnected");
  }, []);

  useEffect(() => {
    if (!enabled) {
      reset();
      return;
    }

    reset();

    const voltageUrl = voltageUrlFromEnv();
    const useHttp = voltageUrl.length > 0;

    const pushSample = (vRaw: number, now: number, seedStartIfNeeded: boolean) => {
      if (seedStartIfNeeded && startRef.current === null) {
        startRef.current = now;
      }
      if (startRef.current === null) return;

      lastTsRef.current = now;

      const t0 = startRef.current;
      const elapsed = now - t0;
      setElapsedMs(elapsed);

      const sv = ema(smoothedVoltageRef.current, vRaw, VOLTAGE_EMA_ALPHA);
      smoothedVoltageRef.current = sv;

      const gInstant = convertVoltageToGlucose(sv);
      setInstantGlucose(gInstant);

      let shown: number | null = null;
      if (elapsed >= STABILIZATION_MS) {
        const dg = ema(displayGlucoseRef.current, gInstant, GLUCOSE_DISPLAY_ALPHA);
        displayGlucoseRef.current = dg;
        shown = dg;
      } else {
        displayGlucoseRef.current = null;
      }

      setRawVoltage(vRaw);
      setSmoothedVoltage(sv);
      setDisplayGlucose(shown);
      setLastUpdated(new Date());

      setVoltageSeries((prev) => {
        const next = [...prev, { t: elapsed / 1000, v: vRaw }];
        return next.slice(-CHART_MAX_POINTS);
      });

      if (shown !== null) {
        setGlucoseSeries((prev) => {
          const next = [...prev, { t: elapsed / 1000, g: shown }];
          return next.slice(-CHART_MAX_POINTS);
        });
      }
    };

    if (!useHttp) {
      setConnection("connecting");
      const boot = window.setTimeout(() => {
        setConnection("connected");
        startRef.current = performance.now();
      }, 900);

      const id = window.setInterval(() => {
        if (startRef.current === null) return;

        const now = performance.now();
        lastTsRef.current = now;

        const elapsed = now - startRef.current;
        const vRaw = mockVoltage(elapsed);
        pushSample(vRaw, now, false);
      }, SAMPLE_INTERVAL_MS);

      return () => {
        window.clearTimeout(boot);
        window.clearInterval(id);
      };
    }

    /* ——— HTTP polling (Arduino ESP32) ——— */
    setConnection("connecting");

    let cancelled = false;

    const tick = async () => {
      if (cancelled || httpInflightRef.current) return;
      httpInflightRef.current = true;

      try {
        const res = await fetch(voltageUrl, {
          method: "GET",
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const body: unknown = await res.json();
        const vRaw = parseVoltagePayload(body);

        if (cancelled) return;

        const now = performance.now();
        lastTsRef.current = now;
        pushSample(vRaw, now, true);
        setConnection("connected");
        setHttpLastError(null);
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : String(e);
        setHttpLastError(msg);
        setConnection("disconnected");
      } finally {
        httpInflightRef.current = false;
      }
    };

    void tick();
    const intervalId = window.setInterval(() => void tick(), SAMPLE_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [enabled, reset]);

  return {
    connection,
    elapsedMs,
    rawVoltage,
    smoothedVoltage,
    instantGlucose,
    displayGlucose,
    voltageSeries,
    glucoseSeries,
    stabilizationProgress,
    isSignalStable,
    zone,
    lastUpdated,
    /** Set when `VITE_ESP32_VOLTAGE_URL` is used and the last request failed */
    httpLastError,
    /** `mock` or `http` depending on env */
    source: voltageUrlFromEnv() ? ("http" as const) : ("mock" as const),
    reset,
  };
}
