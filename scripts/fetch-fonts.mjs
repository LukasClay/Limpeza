#!/usr/bin/env node
// One-shot helper: downloads WOFF2 files for the `latin` subset of Cinzel and
// Montserrat from Google Fonts and emits a local /fonts/fonts.css that the
// site can use to self-host them. Re-run only when font weights change.
//
//   node scripts/fetch-fonts.mjs

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");

const CSS_URL =
  "https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const OUT_DIR = resolve(PROJECT_ROOT, "public/fonts");
const CSS_OUT = resolve(OUT_DIR, "fonts.css");

mkdirSync(OUT_DIR, { recursive: true });

console.log("Fetching Google Fonts CSS…");
const css = await fetch(CSS_URL, { headers: { "User-Agent": UA } }).then((r) => r.text());

// Split into @font-face blocks preceded by a comment naming the subset.
const blockRegex = /\/\*\s*([a-z-]+)\s*\*\/\s*(@font-face\s*\{[\s\S]*?\})/g;
const blocks = [];
for (const match of css.matchAll(blockRegex)) {
  blocks.push({ subset: match[1], block: match[2] });
}

const wanted = blocks.filter((b) => b.subset === "latin");
console.log(`Keeping ${wanted.length} latin @font-face blocks (out of ${blocks.length}).`);

const familyRe = /font-family:\s*'([^']+)'/;
const weightRe = /font-weight:\s*(\d+)/;
const urlRe = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/;

const cache = new Map(); // url -> local filename
const localBlocks = [];

for (const { block } of wanted) {
  const family = block.match(familyRe)?.[1];
  const weight = block.match(weightRe)?.[1];
  const url = block.match(urlRe)?.[1];
  if (!family || !weight || !url) continue;

  let filename = cache.get(url);
  if (!filename) {
    const slug = `${family.toLowerCase()}-${weight}`;
    filename = `${slug}.woff2`;
    const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
    writeFileSync(resolve(OUT_DIR, filename), buf);
    cache.set(url, filename);
    console.log(`  download  ${family} ${weight}  →  ${filename}  (${buf.length} bytes)`);
  } else {
    console.log(`  reuse     ${family} ${weight}  →  ${filename}`);
  }

  const localBlock = block.replace(urlRe, `url(/fonts/${filename}) format('woff2')`);
  localBlocks.push(localBlock);
}

const header = `/* Self-hosted Google Fonts (latin subset).
 * Regenerate with: node scripts/fetch-fonts.mjs
 */\n\n`;

writeFileSync(CSS_OUT, header + localBlocks.join("\n\n") + "\n");
console.log(`\nWrote ${CSS_OUT}`);
