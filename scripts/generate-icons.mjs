#!/usr/bin/env node
/**
 * Generates the PWA icons for Algo Arena into public/icons/.
 *
 * Zero dependencies on purpose: the mark is drawn with plain pixel math (a
 * rounded-square gradient tile + an "A" made of two legs and a crossbar), and
 * the PNG files are encoded by hand using Node's built-in `zlib`. The app's
 * actual accent blue is `oklch(0.488 0.243 264.376)` ≈ #2563eb, used for the
 * crossbar.
 *
 *   node scripts/generate-icons.mjs
 */
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "icons");

/* ---- palette ------------------------------------------------------------ */

const BG_TOP = [43, 43, 50]; // zinc-800-ish
const BG_BOTTOM = [9, 9, 11]; // near-black (matches the app's dark theme)
const LETTER = [244, 244, 245]; // zinc-100 (dark-mode foreground)
const ACCENT = [37, 99, 235]; // blue-600 — the app's accent color

/* ---- "A" geometry (normalized 0..1 coords, centered on 0.5, 0.5) --------- */

const LEGS = [
  { ax: 0.3, ay: 0.74, bx: 0.5, by: 0.21 }, // left leg, up to the shared apex
  { ax: 0.7, ay: 0.74, bx: 0.5, by: 0.21 }, // right leg, up to the shared apex
];
const CROSSBAR = { ax: 0.37, ay: 0.565, bx: 0.63, by: 0.565 };
const STROKE = 0.034; // stroke width, normalized

/* ---- minimal PNG encoder ------------------------------------------------- */

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePng(size, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---- drawing ------------------------------------------------------------- */

const clamp01 = (v) => Math.min(1, Math.max(0, v));

function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / len2;
  t = clamp01(t);
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Signed distance to a rounded rect (negative inside, in pixels). */
function roundedRectDist(x, y, hw, hh, r) {
  const qx = Math.abs(x - hw) - (hw - r);
  const qy = Math.abs(y - hh) - (hh - r);
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  return Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r;
}

/**
 * @param {number} size  icon edge length in px
 * @param {{ maskable?: boolean }} [opts]  maskable icons are full-bleed (no
 *   rounded corners — the OS crops them) and must keep the mark inside the
 *   80% safe zone, which the "A" already does.
 * @returns {Buffer} RGBA pixel buffer
 */
function drawIcon(size, { maskable = false } = {}) {
  const buf = Buffer.alloc(size * size * 4);
  const radius = size * 0.22;
  const hw = size / 2;
  const hh = size / 2;
  const strokePx = STROKE * size;

  for (let y = 0; y < size; y++) {
    const t = y / (size - 1); // vertical gradient 0..1
    const bgR = BG_TOP[0] + (BG_BOTTOM[0] - BG_TOP[0]) * t;
    const bgG = BG_TOP[1] + (BG_BOTTOM[1] - BG_TOP[1]) * t;
    const bgB = BG_TOP[2] + (BG_BOTTOM[2] - BG_TOP[2]) * t;

    for (let x = 0; x < size; x++) {
      let bgA = 1;
      if (!maskable) {
        const d = roundedRectDist(x + 0.5, y + 0.5, hw, hh, radius);
        if (d > 0) bgA = 0; // outside the rounded tile
        else if (d > -1) bgA = clamp01(d + 1); // 1px soft corner edge
      }

      let r = bgR;
      let g = bgG;
      let b = bgB;
      let a = 255 * bgA;

      // Letter: nearest of the two legs and the crossbar.
      const u = (x + 0.5) / size;
      const v = (y + 0.5) / size;
      let dLeg = Infinity;
      for (const s of LEGS) dLeg = Math.min(dLeg, distToSegment(u, v, s.ax, s.ay, s.bx, s.by));
      const dBar = distToSegment(u, v, CROSSBAR.ax, CROSSBAR.ay, CROSSBAR.bx, CROSSBAR.by);
      const dLetter = Math.min(dLeg, dBar);

      // ~1px anti-aliased edge around the stroke.
      const cover = clamp01(strokePx + 0.5 - dLetter * size);
      if (cover > 0) {
        const isBar = dBar < dLeg;
        const lr = isBar ? ACCENT[0] : LETTER[0];
        const lg = isBar ? ACCENT[1] : LETTER[1];
        const lb = isBar ? ACCENT[2] : LETTER[2];
        r += (lr - r) * cover;
        g += (lg - g) * cover;
        b += (lb - b) * cover;
        a += (255 - a) * cover;
      }

      const idx = (y * size + x) * 4;
      buf[idx] = Math.round(r);
      buf[idx + 1] = Math.round(g);
      buf[idx + 2] = Math.round(b);
      buf[idx + 3] = Math.round(a);
    }
  }
  return buf;
}

/* ---- main ---------------------------------------------------------------- */

mkdirSync(OUT_DIR, { recursive: true });

const targets = [
  ["icon-180.png", 180, false], // apple-touch-icon
  ["icon-192.png", 192, false], // installability minimum
  ["icon-512.png", 512, false],
  ["icon-maskable-512.png", 512, true], // adaptive / masked launchers
];

for (const [name, size, maskable] of targets) {
  const png = encodePng(size, drawIcon(size, { maskable }));
  const out = path.join(OUT_DIR, name);
  writeFileSync(out, png);
  console.log(`[icons] wrote public/icons/${name} (${size}×${size}${maskable ? ", maskable" : ""})`);
}
