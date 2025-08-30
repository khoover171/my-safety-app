import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, message: "Claude endpoint is up ✅" });
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Missing CLAUDE_API_KEY" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as { prompt?: string };
    const prompt = body.prompt ?? "Say hello from Claude.";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229", // safe Claude model
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { ok: false, status: response.status, details: text },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
