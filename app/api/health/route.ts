import { NextResponse } from "next/server";

// Add every place your frontend can live
const ALLOWED_ORIGINS = [
  "http://localhost:8080",                // your local Lovable preview
  "https://lovable.dev",                  // Lovable editor
  "https://onepage-test.lovable.app",     // your published Lovable site
  "https://onepage-test-rieu.vercel.app", // your Vercel API domain
];

// Build CORS headers for the incoming request's origin
function makeCorsHeaders(origin: string | null) {
  const allow =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : "false-origin";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// Handle GET /api/health
export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  const headers = makeCorsHeaders(origin);
  return NextResponse.json(
    { ok: true, message: "SI is running 🚀" },
    { headers }
  );
}

// Handle CORS preflight (OPTIONS)
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  const headers = makeCorsHeaders(origin);
  return NextResponse.json({}, { headers });
}
