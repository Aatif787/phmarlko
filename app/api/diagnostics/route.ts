import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const envStatus = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    USING_HARDCODED_FALLBACK: !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL || "false",
  };

  return NextResponse.json(envStatus);
}
