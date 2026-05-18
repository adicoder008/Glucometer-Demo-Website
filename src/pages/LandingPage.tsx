import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FeatureSection } from "../components/landing/FeatureSection";
import { Hero } from "../components/landing/Hero";

export function LandingPage() {
  return (
    <div className="relative">
      <Hero />
      <FeatureSection />

      <section className="mx-auto max-w-6xl px-5 pb-28 md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="glass-strong relative overflow-hidden rounded-[2rem] px-8 py-14 text-center md:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(34_211_238/0.18),transparent_55%)]" />
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Ready when you are</p>
          <h2
            className="relative mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-white md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Open the live biosensing canvas.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-slate-400">
            The monitoring dashboard runs a high-fidelity voltage simulator until you pipe real ESP32 readings into the
            same interface.
          </p>
          <Link
            to="/monitor"
            className="relative mt-10 inline-flex rounded-full bg-white px-10 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_40px_rgb(255_255_255/0.15)] transition-transform hover:scale-[1.02]"
          >
            Launch live dashboard
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
