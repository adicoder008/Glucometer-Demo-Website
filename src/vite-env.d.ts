/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Full URL to GET a JSON voltage reading, e.g. `http://192.168.1.50/voltage`
   * or dev proxy path `/esp32-proxy/voltage` (see vite.config.ts).
   * If unset or empty, the app uses the built-in mock stream.
   */
  readonly VITE_ESP32_VOLTAGE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
