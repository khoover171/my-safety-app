import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "http://localhost:8080",                      // Lovable dev preview
  "https://onepage-test.lovable.app",           // Lovable hosted
  "https://onepage-test-rieu.vercel.app",       // Vercel deployment
  // add custom domain later if you point one to Vercel
];

function cors(origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : "null";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function GET(req: Request) {
  const headers = cors(req.headers.get("origin"));
  return NextResponse.json(
    { ok: true, message: "SI is running 🚀" },
    { headers }
  );
}

export async function OPTIONS(req: Request) {
  const headers = cors(req.headers.get("origin"));
  return NextResponse.json({}, { headers });
}
