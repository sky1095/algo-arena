import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createUser, getUserByEmail, publicUser } from "@/lib/db";
import { hashPassword, isValidEmail, isValidPassword, openSession, setSessionCookie } from "@/lib/auth";
import { checkRateLimit, rateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  if (checkRateLimit(req, 10, { headers: new Headers() }) === 0) {
    return rateLimited();
  }
  let body: { name?: unknown; email?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!name || name.length > 50) {
    return NextResponse.json({ error: "Please enter a name (max 50 characters)." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!isValidPassword(password)) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }
  if (getUserByEmail(email)) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const user = createUser({ email, name, passwordHash: hashPassword(password) });
  const token = openSession(user.id);
  const res = NextResponse.json({ user: publicUser(user) });
  setSessionCookie(res, token);
  return res;
}
