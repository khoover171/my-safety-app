"use client";

export default function Home() {
  async function checkHealth() {
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      const data: { ok: boolean; message: string } = await res.json();
      alert(data.ok ? `✅ ${data.message}` : "❌ Health check failed");
    } catch {
      alert("❌ Could not reach /api/health");
    }
  }

  return (
    <main>
      <h1>Welcome to SI 🚀</h1>
      <button onClick={checkHealth}>Health</button>
    </main>
  );
}
