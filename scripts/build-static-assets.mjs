#!/usr/bin/env node
// Generates static assets that the browser fetches by stable URL:
//   - public/og-image.jpg          (1200x630, used by og:image / twitter:image)
//   - public/apple-touch-icon.png  (180x180,  used by iOS home screen)
//
// Also (re)compresses the source hero image (used as the LocalBusiness JSON-LD
// `image` and as the input for the runtime <Picture> in src/assets). Original
// renders are typically 1-2MB; sharp's PNG quantizer brings that down ~10x
// without visible loss for our hero crop.
//
// Inputs are the existing brand assets in public/. Re-run after changing them.
//
//   node scripts/build-static-assets.mjs

import { copyFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(PROJECT_ROOT, "public");
const SRC_ASSETS = resolve(PROJECT_ROOT, "src/assets");

const HERO = resolve(PUBLIC, "hero-cleaning.png");
const HERO_SRC_ASSET = resolve(SRC_ASSETS, "hero-cleaning.png");
const LOGO = resolve(PUBLIC, "brand/logo-primary.png");
const OG_OUT = resolve(PUBLIC, "og-image.jpg");
const APPLE_OUT = resolve(PUBLIC, "apple-touch-icon.png");

const formatSize = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

console.log("Compressing hero-cleaning.png at source…");
const heroBefore = statSync(HERO).size;
const compressed = await sharp(HERO)
  .resize({ width: 1600, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true, quality: 85, effort: 10 })
  .toBuffer();
await sharp(compressed).toFile(HERO);
copyFileSync(HERO, HERO_SRC_ASSET);
const heroAfter = statSync(HERO).size;
console.log(
  `  ${formatSize(heroBefore)} → ${formatSize(heroAfter)} (${(((heroBefore - heroAfter) / heroBefore) * 100).toFixed(0)}% saved)`,
);

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
