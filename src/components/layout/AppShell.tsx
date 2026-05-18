import type { ReactNode } from "react";
import { AmbientBackground } from "../ui/AmbientBackground";
import { Navbar } from "./Navbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-8 text-center text-xs text-slate-500">
        <p>GluStream demo · ESP32 · ADS1115 · electrochemical sensing · educational prototype</p>
      </footer>
    </div>
  );
}
