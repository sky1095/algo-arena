"use client";

import { useEffect } from "react";

/**
 * Registers the service worker so the app is installable as a PWA.
 *
 * Only in production builds (`next start` / Docker): the dev server has HMR
 * and doesn't need a worker. Service workers also require a secure context
 * (HTTPS or localhost), so this silently no-ops on plain-http LAN access —
 * the app still works, it just isn't installable there.
 */
export function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    if (!window.isSecureContext) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* offline-friendly: a failed registration must never break the app */
    });
  }, []);

  return null;
}
