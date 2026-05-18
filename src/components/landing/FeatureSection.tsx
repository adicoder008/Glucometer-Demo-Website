import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";

const items = [
  {
    title: "Hardware-aware pipeline",
    description:
      "Voltage frames mirror what your ESP32 emits — swap the mock stream for WebSocket or Serial bridge when you wire hardware.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3v3m6.364 2.636l-2.12 2.121M21 12h-3M18.364 17.364l-2.12-2.121M12 21v-3m-6.364-2.636l2.12-2.121M3 12h3M5.636 6.636l2.12 2.121"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Adaptive stabilization",
    description:
      "Sixty-second convergence window with gradient progress — only calm, trustworthy glucose readouts surface to the UI.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 19V5m4 14V9m4 10V7m4 12v-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Visualization that sells",
    description:
      "Voltage trace, glucose history, ambient glow system — crafted like wearable software from an elite design team.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 14.5L9 9.5l4 4 7-7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M4 19h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400/90">Platform</p>
        <h2
          className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Everything judges expect from a biosensing demo.
        </h2>
        <p className="mt-4 text-slate-400 md:text-lg">
          Nothing noisy. Nothing placeholder-generic. Just a cohesive narrative from sensor voltage to confident
          glucose storytelling.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <GlassCard key={item.title} delay={i * 0.06} glow={i === 1}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/15 text-cyan-200 ring-1 ring-white/10">
              {item.icon}
            </div>
            <h3
              className="mt-6 font-[family-name:var(--font-display)] text-lg font-semibold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
