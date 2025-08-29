import { NextResponse } from "next/server";

// every place your frontend can live
const ALLOWED_ORIGINS = [
  "http://localhost:8080",                // local Lovable preview (Vite)
  "https://lovable.dev",                  // Lovable editor
  "https://onepage-test.lovable.app",     // your published Lovable site
  "https://onepage-test-rieu.vercel.app", // your Vercel API domain
];

function makeCorsHeaders(origin: string | null) {
  // allow lovable.dev and any exact matches in the list
  const allow =
    (origin &&
      (origin.startsWith("https://lovable.dev") ||
       ALLOWED_ORIGINS.includes(origin))) ? origin : "*";

  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  const headers = makeCorsHeaders(origin);
  return NextResponse.json({ ok: true, message: "SI is running 🚀" }, { headers });
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  const headers = makeCorsHeaders(origin);
  // some browsers prefer 204 for preflight
  return new NextResponse(null, { status: 204, headers });
}
