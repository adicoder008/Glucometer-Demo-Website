import { useId, type ReactNode } from "react";
import type { VoltagePoint } from "../../hooks/useGlucoseMonitor";

type Props = {
  samples: VoltagePoint[];
};

/** Fixed height so the dashboard column does not jump when the first samples arrive. */
export function WaveformStrip({ samples }: Props) {
  const strokeId = `waveStroke-${useId()}`;
  const recent = samples.slice(-48);

  const shell = (body: ReactNode) => (
    <div className="flex h-[7.5rem] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 px-3 py-3">
      <div className="mb-2 flex shrink-0 items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        <span>Waveform</span>
        <span className="text-cyan-400/90">{recent.length >= 2 ? "Live trace" : "Waiting"}</span>
      </div>
      <div className="min-h-0 flex-1">{body}</div>
    </div>
  );

  if (recent.length < 2) {
    return shell(
      <div className="flex h-full items-center justify-center text-xs text-slate-500">Awaiting samples…</div>,
    );
  }

  const voltages = recent.map((p) => p.v);
  const min = Math.min(...voltages);
  const max = Math.max(...voltages);
  const pad = (max - min) * 0.35 || 0.01;

  const w = 360;
  const h = 80;
  const points = voltages.map((v, i) => {
    const x = (i / (voltages.length - 1)) * w;
    const y = h - ((v - (min - pad)) / (max - min + pad * 2)) * (h - 8) - 4;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;

  return shell(
    <svg viewBox={`0 0 ${w} ${h}`} className="block h-full min-h-0 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <path d={pathD} fill="none" stroke={`url(#${strokeId})`} strokeWidth="2" />
    </svg>,
  );
}
