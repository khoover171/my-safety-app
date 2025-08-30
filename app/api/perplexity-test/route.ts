// app/api/perplexity-test/route.ts
import { NextResponse } from "next/server";

// Accept either PERPLEXITY_API_KEY or PPLX_API_KEY
const PPLX_KEY =
  process.env.PERPLEXITY_API_KEY || process.env.PPLX_API_KEY || "";

// Minimal types for Perplexity response
type PplxMessage = { role: "system" | "user" | "assistant"; content: string };
type PplxChoice = { message: PplxMessage };
type PplxResponse = { choices?: PplxChoice[] };

export async function GET() {
  return NextResponse.json({ ok: true, message: "Perplexity endpoint is alive" });
}

export async function POST(req: Request) {
  try {
    if (!PPLX_KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing PERPLEXITY_API_KEY on server" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as { prompt?: string };
    const prompt = body?.prompt ?? "Say hello";

    const pplxRes = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PPLX_KEY}`,
      },
      body: JSON.stringify({
        model: "sonar", // or another Perplexity model you enabled
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!pplxRes.ok) {
      return NextResponse.json(
        { ok: false, error: `HTTP ${pplxRes.status}` },
        { status: pplxRes.status }
      );
    }

    const data = (await pplxRes.json()) as PplxResponse;
    const text =
      data.choices && data.choices[0]?.message?.content
        ? data.choices[0].message.content
        : "";

    return NextResponse.json({ ok: true, text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
