"use client";

export default function Home() {
  async function checkHealth() {
    try {
      const res = await fetch("/api/health");
      if (!res.ok) {
        alert("Health check failed ❌ (HTTP " + res.status + ")");
        return;
      }
      const data = await res.json();
      const healthy = data.ok === true || data.status === "ok";
      alert(healthy ? "Health OK ✅" : "Health check failed ❌");
    } catch {
      alert("Could not reach /api/health ❌");
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Welcome to SI 🚀</h1>
      <button
        onClick={checkHealth}
        style={{ marginTop: 16, padding: "10px 18px", cursor: "pointer" }}
      >
        Health
      </button>
    </main>
  );
}
