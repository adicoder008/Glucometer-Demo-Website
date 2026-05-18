import { motion } from "framer-motion";
import { useMemo } from "react";
import { GlucoseChart } from "../components/dashboard/GlucoseChart";
import { GlucoseMainCard } from "../components/dashboard/GlucoseMainCard";
import { SensorStatusPanel } from "../components/dashboard/SensorStatusPanel";
import { VoltageChart } from "../components/dashboard/VoltageChart";
import { WaveformStrip } from "../components/dashboard/WaveformStrip";
import { ProgressRing } from "../components/ui/ProgressRing";
import { STABILIZATION_MS, useGlucoseMonitor } from "../hooks/useGlucoseMonitor";
import { computeSignalQuality } from "../lib/signalQuality";

export function DashboardPage() {
  const monitoring = useGlucoseMonitor(true);

  const signalQuality = useMemo(
    () => computeSignalQuality(monitoring.voltageSeries),
    [monitoring.voltageSeries],
  );

  return (
    <div className="relative mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-400/90">Live session</p>
          <h1
            className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Glucose command center
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            {monitoring.source === "http"
              ? "Voltage arrives over HTTP from your firmware; smoothing, stabilization, and glucose damping run in the browser."
              : "Mock ESP32 stream applies voltage smoothing, sixty-second stabilization, and gentle glucose damping so the UI stays calm while hardware noise persists."}
          </p>
          <p className="mt-2 max-w-xl text-xs text-slate-500">
            Source:{" "}
            <span className="font-medium text-slate-300">
              {monitoring.source === "http" ? "HTTP polling (VITE_ESP32_VOLTAGE_URL)" : "simulator"}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-6 rounded-3xl border border-white/[0.08] bg-white/[0.03] px-6 py-4 backdrop-blur-md">
          <ProgressRing
            progress={monitoring.stabilizationProgress}
            size={112}
            stroke={5}
            label="Lock-in"
          />
          <div className="text-sm text-slate-400">
            <p className="font-medium text-white">Signal stabilization</p>
            <p className="mt-1 text-xs leading-relaxed">
              {monitoring.isSignalStable
                ? "Display glucose is damped for steady readings."
                : `Hold for ${Math.ceil(STABILIZATION_MS / 1000)}s for trusted output.`}
            </p>
          </div>
        </div>
      </motion.div>

      {monitoring.source === "http" && monitoring.httpLastError && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
        >
          <span className="font-medium">HTTP sensor:</span> {monitoring.httpLastError} — check Wi‑Fi, URL, and that the
          ESP32 returns JSON like{" "}
          <code className="rounded bg-black/30 px-1 font-mono text-xs">{"{\"v\":0.421}"}</code>.
        </motion.div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0 space-y-6">
          <GlucoseMainCard
            displayGlucose={monitoring.displayGlucose}
            zone={monitoring.zone}
            isSignalStable={monitoring.isSignalStable}
            lastUpdated={monitoring.lastUpdated}
          />

          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="flex min-h-[4.5rem] flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Voltage trace</p>
                <p className="mt-1 text-lg font-semibold text-white">Incoming sensor voltage</p>
              </div>
              <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                Raw → smoothed → calibrated
              </span>
            </div>
            <div className="mt-6">
              <VoltageChart data={monitoring.voltageSeries} />
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="flex min-h-[4.5rem] flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Glucose history</p>
                <p className="mt-1 text-lg font-semibold text-white">Stabilized stream</p>
              </div>
              <span
                className={`text-xs font-medium ${monitoring.isSignalStable ? "invisible" : "text-amber-200/90"}`}
                aria-hidden={monitoring.isSignalStable}
              >
                Chart fills after lock-in
              </span>
            </div>
            <div className="mt-6">
              {monitoring.glucoseSeries.length > 1 ? (
                <GlucoseChart data={monitoring.glucoseSeries} />
              ) : (
                <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center text-sm text-slate-500 md:h-72">
                  Chart activates once stabilization completes — prevents jitter in the narrative curve.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-6 lg:max-w-none">
          <SensorStatusPanel
            connection={monitoring.connection}
            stabilizationProgress={monitoring.stabilizationProgress}
            elapsedMs={monitoring.elapsedMs}
            rawVoltage={monitoring.rawVoltage}
            signalQuality={signalQuality}
          />

          <div className="glass overflow-hidden rounded-3xl p-6 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Waveform</p>
            <p className="mt-2 text-lg font-semibold text-white">Live oscilloscope strip</p>
            <div className="mt-6">
              <WaveformStrip samples={monitoring.voltageSeries} />
            </div>
          </div>

          <div className="glass overflow-hidden rounded-3xl p-6 text-sm leading-relaxed text-slate-400 md:p-7">
            <p className="font-medium text-white">How this maps to hardware</p>
            <p className="mt-3">
              Set <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-cyan-100">VITE_ESP32_VOLTAGE_URL</code> to your{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-cyan-100">GET /voltage</code> endpoint (see{" "}
              <code className="rounded bg-white/10 px-1 font-mono text-[11px] text-cyan-100">firmware/esp32_voltage_http</code>). Dev proxy:{" "}
              <code className="rounded bg-white/10 px-1 font-mono text-[11px] text-cyan-100">/esp32-proxy/voltage</code> +{" "}
              <code className="rounded bg-white/10 px-1 font-mono text-[11px] text-cyan-100">DEV_ESP32_TARGET</code>. Same smoothing and lock-in either way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
