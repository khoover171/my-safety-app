import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Call a simple OpenAI endpoint
    const res = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json({
      ok: true,
      message: "OpenAI reachable ✅",
      models: data.data ? data.data.length : 0,
    });
  } catch (err: unknown) {
    // Safely handle unknown error
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
