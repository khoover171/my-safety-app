import { NextResponse } from "next/server";

// Quick heartbeat so you can test in a browser with GET
export async function GET() {
  return NextResponse.json({ ok: true, message: "Perplexity endpoint is up ✅" });
}

// Ask Perplexity with POST { "question": "your prompt here" }
export async function POST(req: Request) {
  try {
    const apiKey = process.env.PPLX_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Missing PPLX_API_KEY in environment." },
        { status: 500 }
      );
    }

    // Read the prompt from the request body
    const body = await req.json().catch(() => ({}));
    const question =
      typeof body?.question === "string" && body.question.trim().length > 0
        ? body.question.trim()
        : "Say hello from Perplexity in one short sentence.";

    // Perplexity uses an OpenAI-style Chat Completions endpoint
    const resp = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar", // you can try: "sonar", "sonar-small-chat", etc.
        messages: [
          { role: "system", content: "You are a concise helpful assistant." },
          { role: "user", content: question },
        ],
        temperature: 0.2,
        max_tokens: 300,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json(
        { ok: false, error: `HTTP ${resp.status}`, details: text.slice(0, 500) },
        { status: resp.status }
      );
    }

    const data = await resp.json();
    const answer = data?.choices?.[0]?.message?.content ?? null;

    return NextResponse.json({ ok: true, answer, raw: data });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}
