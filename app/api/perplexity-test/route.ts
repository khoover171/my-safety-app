import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.PERPLEXITY_API_KEY;

  if (!key) {
    return NextResponse.json(
      { ok: false, error: "Missing PERPLEXITY_API_KEY on server" },
      { status: 500 }
    );
  }

  try {
    // Perplexity "models" endpoint
    const res = await fetch("https://api.perplexity.ai/models", {
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json({
      ok: true,
      message: "Perplexity reachable ✅",
      models: Array.isArray(data) ? data.length : 0,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
