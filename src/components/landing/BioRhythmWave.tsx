import { motion } from "framer-motion";

/** Futuristic dual-layer waveform — evokes biosignal + glucose rhythm. */
export function BioRhythmWave() {
  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-transparent p-6 shadow-[0_0_60px_rgb(34_211_238/0.08)]">
      <div className="mb-4 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
        <span>Live biosignal</span>
        <span className="flex items-center gap-2 text-cyan-300/90">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          Simulated stream
        </span>
      </div>
      <svg
        viewBox="0 0 900 200"
        className="h-36 w-full md:h-44"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="50%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M0 100 Q 40 40 80 100 T 160 100 Q 200 160 240 100 T 320 100 Q 360 28 400 100 T 480 100 Q 520 152 560 100 T 640 100 Q 680 36 720 100 T 800 100 Q 840 120 900 100"
          fill="none"
          stroke="url(#strokeGrad)"
          strokeWidth="2.5"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M0 118 Q 60 150 120 118 T 240 118 Q 300 70 360 118 T 480 118 Q 540 168 600 118 T 720 118 Q 780 88 840 118 T 900 118"
          fill="none"
          stroke="rgb(167 139 250 / 0.35)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />

        <motion.path
          d="M0 100 Q 40 40 80 100 T 160 100 Q 200 160 240 100 T 320 100 Q 360 28 400 100 T 480 100 Q 520 152 560 100 T 640 100 Q 680 36 720 100 T 800 100 Q 840 120 900 100 L 900 200 L 0 200 Z"
          fill="url(#waveGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />

      </svg>
    </div>
  );
}
