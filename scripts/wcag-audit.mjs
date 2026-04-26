#!/usr/bin/env node
// Audits text/background color pairs that appear in the codebase against
// WCAG AA (4.5:1 for normal text, 3:1 for large) and AAA (7:1 / 4.5:1).
// Reports failing pairs so we can darken/lighten as needed.
//
//   node scripts/wcag-audit.mjs

const hexToRgb = (hex) => {
  const m = hex.replace("#", "");
  return [
    parseInt(m.slice(0, 2), 16),
    parseInt(m.slice(2, 4), 16),
    parseInt(m.slice(4, 6), 16),
  ];
};

const relLum = (rgb) => {
  const [R, G, B] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

const contrast = (a, b) => {
  const la = relLum(hexToRgb(a));
  const lb = relLum(hexToRgb(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
};

const verdict = (ratio) => {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA-large";
  return "FAIL";
};

// Manual inventory of the most-used (text, background) pairs in the site.
const pairs = [
  ["#0b1f33", "#ffffff", "Headings (navy on white)"],
  ["#4a545b", "#ffffff", "Body / muted on white"],
  ["#64748b", "#ffffff", "Slate-500 helper text on white"],
  ["#0b1f33", "#f4f7f8", "Headings on mist bg"],
  ["#4a545b", "#f4f7f8", "Body on mist bg"],
  ["#ffffff", "#0b1f33", "White on navy"],
  ["#d8ead3", "#0b1f33", "Eyebrow on navy"],
  ["#cbd5e1", "#0b1f33", "Slate-300 on navy"],
  ["#cbd5e1", "#07172a", "Slate-300 on navy-soft (footer)"],
  ["#94a3b8", "#07172a", "Slate-400 on navy-soft (copyright)"],
  ["#ffffff", "#2e7d32", "White text on green button"],
  ["#ffffff", "#25d366", "White text on whatsapp button (BRAND tradeoff)"],
  ["#2eb872", "#07172a", "Green-accent label on navy-soft"],
  ["#256628", "#ffffff", "Green-dark eyebrow on white"],
  ["#256628", "#f4f7f8", "Green-dark eyebrow on mist"],
];

let fails = 0;
let aaOnly = 0;
console.log("WCAG contrast audit\n");
console.log(
  "context".padEnd(48) +
    "fg".padEnd(10) +
    "bg".padEnd(10) +
    "ratio".padEnd(8) +
    "verdict",
);
console.log("-".repeat(82));
for (const [fg, bg, note] of pairs) {
  const r = contrast(fg, bg);
  const v = verdict(r);
  const flag = v === "FAIL" ? " ⚠️ FAIL" : v === "AA-large" ? " ⚠️ AA-large only" : "";
  if (v === "FAIL") fails++;
  if (v === "AA" || v === "AA-large") aaOnly++;
  console.log(
    `${note.padEnd(48)}${fg.padEnd(10)}${bg.padEnd(10)}${r.toFixed(2).padEnd(8)}${v}${flag}`,
  );
}
console.log("-".repeat(82));
console.log(`Pairs failing AA: ${fails}`);
console.log(`Pairs passing AA but not AAA: ${aaOnly}`);

