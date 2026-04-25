#!/usr/bin/env node
// Generates static assets that the browser fetches by stable URL:
//   - public/og-image.jpg          (1200x630, used by og:image / twitter:image)
//   - public/apple-touch-icon.png  (180x180,  used by iOS home screen)
//
// Inputs are the existing brand assets in public/. Re-run after changing them.
//
//   node scripts/build-static-assets.mjs

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(PROJECT_ROOT, "public");

const HERO = resolve(PUBLIC, "hero-cleaning.png");
const LOGO = resolve(PUBLIC, "brand/logo-primary.png");
const OG_OUT = resolve(PUBLIC, "og-image.jpg");
const APPLE_OUT = resolve(PUBLIC, "apple-touch-icon.png");

console.log("Building og-image.jpg (1200x630)…");
await sharp(HERO)
  .resize(1200, 630, { fit: "cover", position: "center" })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(OG_OUT);

console.log("Building apple-touch-icon.png (180x180)…");
const NAVY = "#0B1F33";
const padded = await sharp(LOGO)
  .resize(140, 140, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

await sharp({
  create: {
    width: 180,
    height: 180,
    channels: 4,
    background: NAVY,
  },
})
  .composite([{ input: padded, gravity: "center" }])
  .png()
  .toFile(APPLE_OUT);

console.log("\nDone.");
