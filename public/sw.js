/* Algo Arena — service worker.
 *
 * The judge runs server-side (submissions are compiled/executed locally by the
 * server), so this is an installable, instant-loading app shell — not a fully
 * offline app. Strategy:
 *
 *   - navigations:          network-first; when the server is unreachable the
 *                           friendly `server-down.html` screen is served from
 *                           cache instead (it explains how to restart the
 *                           server and auto-reconnects). The last cached shell
 *                           HTML is only a last-resort fallback.
 *   - static assets         stale-while-revalidate (instant loads, refreshed
 *     (/_next/static, /vs,   in the background) — these are hashed/immutable
 *      /icons)
 *   - /api/* and anything   network only, never cached (auth, judge results,
 *     else                  progress — must always be live)
 */
const CACHE_NAME = "algo-arena-shell-v2";
const SHELL_URL = "./";
const SERVER_DOWN_URL = "./server-down.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Precache the "server isn't running" screen so it's available even on a
      // fresh install where the app shell was never successfully cached.
      await cache.add(SERVER_DOWN_URL).catch(() => {});
    })()
  );
  // Activate immediately so a fresh worker takes over on the next load.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/vs/") ||
    url.pathname.startsWith("/icons/")
  );
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    // Server unreachable: explain it (and how to restart it) instead of
    // showing a stale, mostly-dead shell.
    const down = await cache.match(SERVER_DOWN_URL);
    if (down) return down;
    const cached = (await cache.match(request)) || (await cache.match(SHELL_URL));
    if (cached) return cached;
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || refresh;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }
  if (isStaticAsset(url)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
