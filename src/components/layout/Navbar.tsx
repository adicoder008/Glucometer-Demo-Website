import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-white/10 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.15)]"
      : "text-slate-400 hover:text-white",
  ].join(" ");

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#030712]/75 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <NavLink to="/" className="group flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/25 to-violet-500/25 ring-1 ring-white/15">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/40 to-violet-500/30 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
            <svg viewBox="0 0 24 24" className="relative h-5 w-5 text-cyan-200" aria-hidden>
              <path
                fill="currentColor"
                d="M12 2C8 7 4 10 4 14a8 8 0 1016 0c0-4-4-7-8-12z"
                opacity=".35"
              />
              <path
                fill="currentColor"
                d="M12 22c-2.5-3-5-6-5-9a5 5 0 0110 0c0 3-2.5 6-5 9z"
              />
            </svg>
          </span>
          <div className="flex flex-col leading-tight">
            <span
              className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              GluStream
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              BioSense OS
            </span>
          </div>
        </NavLink>

        <nav className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] p-1">
          <NavLink to="/" className={linkClass} end>
            Overview
          </NavLink>
          <NavLink to="/monitor" className={linkClass}>
            Live Monitor
          </NavLink>
        </nav>
      </div>
    </motion.header>
  );
}
