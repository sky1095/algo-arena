import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserByEmail } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { checkRateLimit, rateLimited } from "@/lib/rate-limit";

/**
 * Checks an email+password combo WITHOUT creating a session. Used before
 * encrypting an export with the account password, so a typo is caught at
 * export time instead of producing an unusable backup.
 */
export async function POST(req: NextRequest) {
  if (checkRateLimit(req, 20, { headers: new Headers() }) === 0) {
    return rateLimited();
  }
  let body: { email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) return NextResponse.json({ ok: false }, { status: 400 });

  const user = getUserByEmail(email);
  return NextResponse.json({ ok: !!user && verifyPassword(password, user.passwordHash) });
}
