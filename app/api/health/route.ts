import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:8080",                 // local Lovable preview
  "https://lovable.dev",                   // Lovable editor
  "https://onepage-test.lovable.app",      // your published Lovable site (adjust if your slug differs)
  "https://onepage-test-rieu.vercel.app",  // your Vercel API app
];

function makeCorsHeaders(origin: string | null) {
  const allow =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : "false-origin";

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    // default allow; the OPTIONS handler will overwrite this to echo requested headers
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
  return headers;
}

export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  const headers = makeCorsHeaders(origin);
  return NextResponse.json({ ok: true, message: "SI is running 🚀" }, { headers });
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  const headers = makeCorsHeaders(origin);

  // Echo back what the browser says it wants to send (fixes editor “Failed to fetch”)
  const requested = req.headers.get("access-control-request-headers");
  if (requested) headers["Access-Control-Allow-Headers"] = requested;

  return NextResponse.json({}, { headers });
}
