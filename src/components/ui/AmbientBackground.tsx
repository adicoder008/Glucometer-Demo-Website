import { motion } from "framer-motion";

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-1/3 h-[440px] w-[440px] rounded-full bg-violet-500/12 blur-[110px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-emerald-500/10 blur-[100px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgb(3_7_18/0.85)_55%,#030712_100%)]" />
    </div>
  );
}
