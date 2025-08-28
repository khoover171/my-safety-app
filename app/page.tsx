"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkHealth() {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      // Relative path works locally and on Vercel
      const res = await fetch("/api/health", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStatus(data.message ?? "OK");
    } catch (e: any) {
      setError("Health check failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Welcome to SI 🚀</h1>

      <button
        onClick={checkHealth}
        style={{
          marginTop: 12,
          padding: "8px 14px",
          borderRadius: 8,
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        Health
      </button>

      <div style={{ marginTop: 12, minHeight: 24 }}>
        {loading && <span>Checking…</span>}
        {status && <span>✅ {status}</span>}
        {error && <span>❌ {error}</span>}
      </div>
    </main>
  );
}
