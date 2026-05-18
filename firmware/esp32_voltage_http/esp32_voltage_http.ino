/**
 * Minimal Arduino-ESP32 HTTP endpoint for the GluStream web UI.
 *
 * - Connects to WiFi (STA), serves GET /voltage as JSON: {"v":0.421}
 * - Sends CORS headers so a browser can fetch directly from the chip IP.
 * - Replace readVoltageVolts() with your ADS1115 + analog front-end readout (volts).
 *
 * Dashboard env (dev with Vite proxy):
 *   VITE_ESP32_VOLTAGE_URL=/esp32-proxy/voltage
 *   DEV_ESP32_TARGET=http://<ESP32_IP>   (in .env.local — see project .env.example)
 */

#include <WiFi.h>
#include <WebServer.h>

const char *WIFI_SSID = "YOUR_SSID";
const char *WIFI_PASSWORD = "YOUR_PASSWORD";

WebServer server(80);

/** Return sensor voltage in volts (example stub — wire ADS1115 here). */
float readVoltageVolts() {
  // TODO: read ADS1115 single-ended channel, convert to volts using PGA / divider.
  return 0.428f;
}

void sendCorsHeaders() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Accept, Content-Type");
}

void handleVoltage() {
  sendCorsHeaders();
  float v = readVoltageVolts();
  String json = "{\"v\":";
  json += String(v, 6);
  json += "}";
  server.send(200, "application/json", json);
}

void handleVoltageOptions() {
  sendCorsHeaders();
  server.send(204);
}

void setup() {
  Serial.begin(115200);
  delay(200);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(400);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/voltage", HTTP_GET, handleVoltage);
  server.on("/voltage", HTTP_OPTIONS, handleVoltageOptions);
  server.begin();
  Serial.println("HTTP server on port 80 — GET /voltage");
}

void loop() {
  server.handleClient();
}
