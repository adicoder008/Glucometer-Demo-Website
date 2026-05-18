import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BioRhythmWave } from "./BioRhythmWave";

const fadeEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: fadeEase },
  }),
};

export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-12 md:px-8 md:pb-28 md:pt-16">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <div>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-slate-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgb(34_211_238)]" />
            Wireless sensing · Real-time edge
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-6xl md:leading-[1.06]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Glucose clarity{" "}
            <span className="text-gradient">without the noise.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg"
          >
            A laboratory-grade monitoring surface for your hackathon demo: continuous voltage ingest from ESP32 +
            ADS1115, adaptive stabilization, and investor-ready visualization — built like a funded health-tech
            product.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/monitor"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-slate-950"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60 bg-gradient-to-r from-cyan-400 to-violet-500" />
              <span className="relative">Start monitoring</span>
            </Link>
            <a
              href="#features"
              className="rounded-full border border-white/[0.12] bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-slate-200 backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/[0.06]"
            >
              Explore platform
            </a>
          </motion.div>

          <motion.dl
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-14 grid grid-cols-3 gap-6 border-t border-white/[0.06] pt-10"
          >
            {[
              { k: "Latency", v: "< 500ms" },
              { k: "Stabilization", v: "60s lock-in" },
              { k: "Channels", v: "16-bit ADC" },
            ].map((row) => (
              <div key={row.k}>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{row.k}</dt>
                <dd className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-white md:text-xl" style={{ fontFamily: "var(--font-display)" }}>
                  {row.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan-500/15 via-transparent to-violet-600/15 blur-2xl" />
          <BioRhythmWave />
          <motion.div
            className="mt-6 grid grid-cols-2 gap-4"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              { title: "Signal fusion", body: "Moving averages + EMA for jitter-resistant glucose." },
              { title: "Clinical polish", body: "Designed for demos that win rooms — dark glass UI." },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="glass rounded-2xl p-5"
              >
                <p className="text-sm font-semibold text-white">{card.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
