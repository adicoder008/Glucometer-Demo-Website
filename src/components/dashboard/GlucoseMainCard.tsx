import { formatGlucoseMgDlHero, zoneLabel } from "../../lib/glucose";
import type { GlucoseZone } from "../../lib/glucose";

type Props = {
  displayGlucose: number | null;
  zone: GlucoseZone | null;
  isSignalStable: boolean;
  lastUpdated: Date | null;
};

function zoneStyles(zone: GlucoseZone | null) {
  switch (zone) {
    case "low":
      return {
        badge: "border-amber-400/35 bg-amber-400/10 text-amber-200",
        glow: "shadow-[0_0_80px_rgb(251_191_36/0.12)]",
      };
    case "high":
      return {
        badge: "border-rose-400/35 bg-rose-400/10 text-rose-100",
        glow: "shadow-[0_0_80px_rgb(251_113_133/0.12)]",
      };
    default:
      return {
        badge: "border-emerald-400/35 bg-emerald-400/10 text-emerald-100",
        glow: "shadow-[0_0_80px_rgb(52_211_153/0.12)]",
      };
  }
}

export function GlucoseMainCard({ displayGlucose, zone, isSignalStable, lastUpdated }: Props) {
  const styles = zoneStyles(zone);
  const timeLabel =
    lastUpdated &&
    lastUpdated.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", second: "2-digit" });

  return (
    <div className={["glass-strong relative rounded-[2rem]", styles.glow].join(" ")}>
      {/* Clip only decorative layers — not status pills */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-400/15 to-violet-600/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-[90px]" />
      </div>

      <div className="relative z-10 p-6 sm:p-8 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Glucose level</p>
            <div className="mt-4 flex min-h-[4rem] flex-wrap items-baseline gap-x-3 gap-y-2 sm:min-h-[4.5rem]">
              <span
                className="max-w-full font-[family-name:var(--font-display)] text-5xl font-semibold tabular-nums tracking-tight text-white sm:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {displayGlucose !== null ? formatGlucoseMgDlHero(displayGlucose) : "—"}
              </span>
              <span className="shrink-0 text-base font-medium text-slate-400 sm:text-lg">mg/dL</span>
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:w-auto lg:flex-col xl:flex-row xl:justify-end">
            <span
              className={[
                "inline-flex items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-md",
                zone ? styles.badge : "border-white/15 bg-white/[0.05] text-slate-300",
              ].join(" ")}
            >
              Status: {zone ? zoneLabel(zone) : "Calibrating"}
            </span>
            <span
              className={[
                "inline-flex items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium",
                isSignalStable
                  ? "border-cyan-400/35 bg-cyan-400/10 text-cyan-100"
                  : "border-white/15 bg-white/[0.05] text-slate-400",
              ].join(" ")}
            >
              {isSignalStable ? "Signal stable" : "Signal stabilizing"}
            </span>
          </div>
        </div>

        <p className="relative mt-8 border-t border-white/[0.06] pt-8 text-sm text-slate-400 sm:mt-10 sm:pt-10">
          Last updated:{" "}
          <span className="inline-block min-w-[10ch] font-medium tabular-nums text-slate-200">{timeLabel ?? "—"}</span>
        </p>
      </div>
    </div>
  );
}
