import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clearSessionCookie, closeSession, getSessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  closeSession(getSessionToken(req));
  const res = NextResponse.json({ ok: true });
  clearSessionCookie(res);
  return res;
}
