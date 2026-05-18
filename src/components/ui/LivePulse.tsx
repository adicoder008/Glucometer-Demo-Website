/** Compact status dot — no expanding ripple (avoids layout paint outside bounds). */
export function LivePulse({ active }: { active: boolean }) {
  return (
    <span
      className={[
        "inline-block h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-black/20",
        active ? "bg-emerald-400 shadow-[0_0_8px_rgb(52_211_153/0.65)]" : "bg-slate-600",
      ].join(" ")}
      aria-hidden
    />
  );
}
