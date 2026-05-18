import { AnimatePresence, motion } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { LandingPage } from "./pages/LandingPage";
import { DashboardPage } from "./pages/DashboardPage";

export default function App() {
  const location = useLocation();

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/monitor" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
