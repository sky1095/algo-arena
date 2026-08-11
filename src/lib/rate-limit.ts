/**
 * Minimal in-memory fixed-window rate limiter, keyed by IP.
 *
 * Good enough for a single-instance deployment (Docker compose). If the app is
 * ever scaled to multiple instances, swap this for a shared store (Redis, DB).
 */

const WINDOW_MS = 60_000;

const buckets = new Map<string, { count: number; resetAt: number }>();

function keyFor(req: Request): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  return ip;
}

/** Returns the number of requests remaining, or 0 (and sets Retry-After) when over. */
export function checkRateLimit(req: Request, limit: number, res: { headers: Headers }): number {
  const now = Date.now();
  const key = keyFor(req);
  let b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    b = { count: 0, resetAt: now + WINDOW_MS };
    buckets.set(key, b);
  }
  b.count += 1;
  const remaining = Math.max(0, limit - b.count);
  res.headers.set("X-RateLimit-Limit", String(limit));
  res.headers.set("X-RateLimit-Remaining", String(remaining));
  res.headers.set("X-RateLimit-Reset", String(Math.ceil(b.resetAt / 1000)));
  if (remaining === 0) {
    res.headers.set("Retry-After", String(Math.ceil((b.resetAt - now) / 1000)));
  }
  // Opportunistic cleanup so the map doesn't grow forever.
  if (buckets.size > 10_000) {
    for (const [k, v] of buckets) {
      if (v.resetAt <= now) buckets.delete(k);
    }
  }
  return remaining;
}

export function rateLimited(): Response {
  return Response.json({ error: "Too many requests — please slow down." }, { status: 429 });
}
