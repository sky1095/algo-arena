import type { MetadataRoute } from "next";

/**
 * Web app manifest — makes Algo Arena installable as a PWA (browser menu /
 * address-bar "Install" button, or "Add to Home Screen" on mobile).
 * Served by Next at /manifest.webmanifest.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Algo Arena — Coding Interview Practice",
    short_name: "Algo Arena",
    description:
      "A curated roadmap of classic algorithm problems with a built-in judge supporting Python, JavaScript, TypeScript, Java and C++.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icons/icon-180.png", sizes: "180x180", type: "image/png" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
