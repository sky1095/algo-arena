import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserByEmail, publicUser } from "@/lib/db";
import { openSession, setSessionCookie, verifyPassword } from "@/lib/auth";
import { checkRateLimit, rateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  if (checkRateLimit(req, 20, { headers: new Headers() }) === 0) {
    return rateLimited();
  }
  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const user = getUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = openSession(user.id);
  const res = NextResponse.json({ user: publicUser(user) });
  setSessionCookie(res, token);
  return res;
}
