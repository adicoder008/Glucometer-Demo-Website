import type { ConnectionState } from "../../hooks/useGlucoseMonitor";
import { LivePulse } from "../ui/LivePulse";

type Props = {
  connection: ConnectionState;
  stabilizationProgress: number;
  elapsedMs: number;
  rawVoltage: number | null;
  signalQuality: number;
};

function formatClock(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function connectionLabel(c: ConnectionState): string {
  switch (c) {
    case "connecting":
      return "Handshaking…";
    case "connected":
      return "Stream active";
    default:
      return "Idle";
  }
}

export function SensorStatusPanel({
  connection,
  stabilizationProgress,
  elapsedMs,
  rawVoltage,
  signalQuality,
}: Props) {
  const espConnected = connection === "connected";
  const adcActive = espConnected;
  const pct = Math.round(signalQuality * 100);

  return (
    <div className="glass flex min-h-[26rem] flex-col overflow-hidden rounded-3xl p-6 md:p-7">
      <div className="flex shrink-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sensor fabric</p>
          <h3
            className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Live telemetry
          </h3>
        </div>
        <div className="flex h-8 shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-medium leading-none text-slate-300">
          <LivePulse active={espConnected} />
          <span className="w-[7.25rem] truncate text-right">{connectionLabel(connection)}</span>
        </div>
      </div>

      <dl className="mt-8 flex flex-1 flex-col gap-0">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b border-white/[0.06] py-3 first:pt-0">
          <dt className="text-sm text-slate-400">ESP32</dt>
          <dd className="min-w-[7.5rem] whitespace-nowrap text-right text-sm font-medium tabular-nums text-white">
            {espConnected ? "Connected" : connection === "connecting" ? "Negotiating…" : "Disconnected"}
          </dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b border-white/[0.06] py-3">
          <dt className="text-sm text-slate-400">ADS1115 ADC</dt>
          <dd className="min-w-[7.5rem] whitespace-nowrap text-right text-sm font-medium text-emerald-200">
            {adcActive ? "Sampling · 16-bit" : "Standby"}
          </dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b border-white/[0.06] py-3">
          <dt className="min-w-0 text-sm text-slate-400">Signal quality</dt>
          <dd className="flex min-w-0 items-center justify-end gap-2">
            <div className="h-2 w-24 shrink-0 overflow-hidden rounded-full bg-white/[0.06] sm:w-28">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-9 shrink-0 text-right text-sm font-semibold tabular-nums text-white">{pct}%</span>
          </dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 py-3">
          <dt className="text-sm text-slate-400">Stabilization timer</dt>
          <dd className="whitespace-nowrap text-right">
            <span
              className="font-[family-name:var(--font-display)] text-lg font-semibold tabular-nums text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {formatClock(elapsedMs)}
            </span>
            <span className="ml-1.5 inline-block min-w-[4.25rem] text-left text-xs tabular-nums text-slate-500">
              / {Math.round(stabilizationProgress * 100)}%
            </span>
          </dd>
        </div>
      </dl>

      <div className="mt-auto min-h-[3rem] shrink-0 rounded-2xl border border-white/[0.07] bg-black/30 px-4 py-3 font-mono text-xs leading-none text-cyan-100/90">
        <span className="text-slate-500">Live voltage · </span>
        <span className="tabular-nums">
          {rawVoltage !== null ? `${rawVoltage.toFixed(3)} V` : "—"}
        </span>
      </div>
    </div>
  );
}
