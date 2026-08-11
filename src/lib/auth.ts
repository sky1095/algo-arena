import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { createSession, deleteSession, getUserBySessionToken } from "@/lib/db";
import type { UserRecord } from "@/lib/db";

/**
 * Password hashing + session cookies. Server-only.
 *
 * Passwords are hashed with scrypt (Node's built-in crypto — no extra
 * dependencies). Sessions are opaque random tokens stored in the database and
 * sent as httpOnly cookies, so they can be revoked on sign-out.
 */

export const SESSION_COOKIE = "algo_arena_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  try {
    const candidate = scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, "hex");
    return candidate.length === expected.length && timingSafeEqual(candidate, expected);
  } catch {
    return false;
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

export function getSessionToken(req: NextRequest): string | null {
  return req.cookies.get(SESSION_COOKIE)?.value ?? null;
}

/** Resolve the signed-in user from a request's session cookie, or null. */
export function getSessionUser(req: NextRequest): UserRecord | null {
  const token = getSessionToken(req);
  if (!token) return null;
  return getUserBySessionToken(token);
}

export interface CookieOptions {
  res: { cookies: { set(name: string, value: string, opts: object): void; delete(name: string): void } };
}

function cookieBase(secure: boolean) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: secure || process.env.NODE_ENV === "production",
  };
}

export function setSessionCookie(res: CookieOptions["res"], token: string): void {
  res.cookies.set(SESSION_COOKIE, token, {
    ...cookieBase(false),
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export function clearSessionCookie(res: CookieOptions["res"]): void {
  res.cookies.set(SESSION_COOKIE, "", {
    ...cookieBase(false),
    maxAge: 0,
  });
}

/** Create a session for the user and return the token (caller sets the cookie). */
export function openSession(userId: string): string {
  return createSession(userId);
}

export function closeSession(token: string | null): void {
  if (token) deleteSession(token);
}
