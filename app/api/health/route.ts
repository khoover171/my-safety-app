import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:8080",          // local Lovable preview
  "https://lovable.dev",            // Lovable editor
  "https://onepage-test.lovable.app", // your published Lovable site
  "https://onepage-test-rieu.vercel.app", // your Vercel API app
];

function makeCorsHeaders(origin: string | null) {
  const allow =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : "false-origin";

  // Echo back any headers the browser says it wants to send
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers":
      // Echo requested headers or allow common ones
      // (this line is what fixes most “Failed to fetch” cases)
      (typeof origin === "string" ? undefined : undefined) ||
      // Will be replaced by the OPTIONS handler logic below
      "Content-Type",
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

  // IMPORTANT: read what headers the browser *wants* to send and allow them
  const requested = req.headers.get("access-control-request-headers");
  if (requested) {
    headers["Access-Control-Allow-Headers"] = requested;
  } else {
    headers["Access-Control-Allow-Headers"] = "Content-Type";
  }

  return NextResponse.json({}, { headers });
}
