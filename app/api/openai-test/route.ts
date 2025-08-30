import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Call OpenAI's models endpoint
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
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
