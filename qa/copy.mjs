/**
 * Copy gate. Text rules that are easy to break and expensive to ship.
 *
 * Source is normalised to one line before matching, because a phrase that wraps
 * across two lines in JSX is still one phrase on the page. That is exactly how
 * the "Sierra College" error below survived a naive grep.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SKIP = new Set(["node_modules", ".next", ".git", "qa", "_og", "public"]);
const EXT = new Set([".ts", ".tsx", ".css"]);

const files = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    if (SKIP.has(e)) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXT.has(extname(e))) files.push(p);
  }
})(ROOT);

const RULES = [
  {
    id: "em-dash",
    why: "House style: no em or en dashes in copy. Use a period, a comma, or restructure.",
    test: /[‐-―−]/g,
  },
  {
    id: "sierra-college",
    why:
      'The business is on Sierra College BLVD. "Sierra College" on its own is a ' +
      "community college several miles north in Rocklin, so the bare phrase tells " +
      "a local the shop is somewhere it is not.",
    test: /Sierra College(?!\s+(?:Blvd|Boulevard))/g,
  },
  { id: "gsap-markers", why: "ScrollTrigger markers left on.", test: /markers\s*:\s*true/g },
  { id: "console-log", why: "Debug logging left in.", test: /\bconsole\.(log|debug)\(/g },
  {
    id: "lorem",
    why: "Placeholder text left in.",
    test: /lorem ipsum|TBD\b/gi,
  },
];

let failures = 0;
for (const file of files) {
  const raw = readFileSync(file, "utf8");
  // Collapse JSX line wrapping so a phrase split across lines is still matched.
  const flat = raw.replace(/\s*\n\s*/g, " ");
  for (const rule of RULES) {
    const hits = [...flat.matchAll(rule.test)];
    if (!hits.length) continue;
    failures += hits.length;
    const rel = file.replace(ROOT, "");
    console.log(`\n[FAIL] ${rule.id}  ${rel}  (${hits.length})`);
    console.log(`   ${rule.why}`);
    for (const h of hits.slice(0, 4)) {
      const ctx = flat.slice(Math.max(0, h.index - 55), h.index + 55).trim();
      console.log(`   ... ${ctx} ...`);
    }
  }
}

console.log(
  failures === 0
    ? `\ncopy gate: clean across ${files.length} files`
    : `\ncopy gate: ${failures} violation(s)`,
);
process.exit(failures === 0 ? 0 : 1);
