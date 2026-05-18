import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

/** Dev-only: browser hits same origin `/esp32-proxy/...` → forwarded to your ESP32 (avoids CORS while developing). */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const esp32Target = env.DEV_ESP32_TARGET ?? "http://192.168.4.1";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/esp32-proxy": {
          target: esp32Target,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/esp32-proxy/, ""),
        },
      },
    },
  };
});
