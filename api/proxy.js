// api/proxy.js
import express from "express";

const app = express();
app.use(express.json({ limit: "10mb" }));

// URL Apps Script kamu
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwm4PIgUTSjDY6r_h6fg1qbA3ai2Mfwwx-4r1Kacas8HKUC-_7L8Dywvs3kBBnZnGw_zA/exec";

// Proxy route untuk upload CV
app.post("/upload", async (req, res) => {
  try {
    const r = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await r.text();
    res.set("Access-Control-Allow-Origin", "*");
    res.type("application/json").send(text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

// OPTIONS handler untuk preflight CORS
app.options("/upload", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.send();
});

// Vercel akan menggunakan handler ini, bukan app.listen()
export default app;
