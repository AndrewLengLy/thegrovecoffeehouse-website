/**
 * Structured data gate. Every JSON-LD block on every page must parse, carry the
 * types that page promises, and never quote a price the menu data does not hold.
 */
import { readFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:3000";
const menuSrc = readFileSync(new URL("../lib/menu.ts", import.meta.url), "utf8");
const knownPrices = new Set([...menuSrc.matchAll(/price: "([\d.]+)"/g)].map(m => m[1]));

const EXPECT = {
  "/": ["CafeOrCoffeeShop", "WebSite", "Event"],
  "/menu": ["Menu", "BreadcrumbList"],
  "/visit": ["FAQPage", "BreadcrumbList"],
  "/our-story": ["BreadcrumbList"],
};

let fails = 0;
const fail = (m) => { fails++; console.log("[FAIL] " + m); };

for (const [path, want] of Object.entries(EXPECT)) {
  const html = await (await fetch(BASE + path)).text();
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const types = [];
  for (const b of blocks) {
    let d; try { d = JSON.parse(b); } catch (e) { fail(`${path}: JSON-LD does not parse: ${e.message}`); continue; }
    types.push(d["@type"]);
    if (b.includes("</")) fail(`${path}: unescaped "</" inside JSON-LD`);
    // Walk for offers and check every price is one we actually have.
    const walk = (o) => { if (!o || typeof o !== "object") return;
      if (o["@type"] === "Offer" && !knownPrices.has(String(o.price))) fail(`${path}: Offer price ${o.price} not in lib/menu.ts`);
      for (const v of Object.values(o)) Array.isArray(v) ? v.forEach(walk) : walk(v); };
    walk(d);
  }
  for (const t of want) if (!types.includes(t)) fail(`${path}: missing @type ${t} (found ${types.join(", ")})`);
  console.log(`[ok]   ${path}: ${blocks.length} block(s): ${types.join(", ")}`);
}

const llms = await fetch(BASE + "/llms.txt");
const lt = await llms.text();
if (llms.status !== 200 || !llms.headers.get("content-type")?.includes("text/plain")) fail("llms.txt not served as text/plain");
for (const must of ["9260 Sierra College Blvd", "Chocolate Fish", "## Menu", "## Hours", "thegrovecoffeehouse916"]) if (!lt.includes(must)) fail(`llms.txt missing "${must}"`);
if (/[‐-―−]/.test(lt)) fail("llms.txt contains an em or en dash");
console.log(`[ok]   /llms.txt: ${lt.split("\n").length} lines`);

const robots = await (await fetch(BASE + "/robots.txt")).text();
const live = Boolean(process.env.NEXT_PUBLIC_SITE_URL);
if (!live && !/Disallow: \/\s*$/m.test(robots)) fail("robots.txt should disallow everything while NEXT_PUBLIC_SITE_URL is unset");
console.log(`[ok]   /robots.txt: ${live ? "live, indexable" : "preview, noindex"}`);

const sm = await (await fetch(BASE + "/sitemap.xml")).text();
for (const p of ["/menu", "/visit", "/our-story"]) if (!sm.includes(p)) fail(`sitemap missing ${p}`);
console.log(`[ok]   /sitemap.xml`);

console.log(fails ? `\nseo gate: ${fails} failure(s)` : "\nseo gate: clean");
process.exit(fails ? 1 : 0);
