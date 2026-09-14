import puppeteer from "puppeteer";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE ?? "http://localhost:3001";
const ROUTES = ["/", "/menu", "/visit", "/our-story", "/definitely-not-a-page"];
const WIDTHS = [375, 1440];

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: "shell",
  userDataDir: "/private/tmp/claude-501/-Users-andrew-thegrovecoffeehouse-website/978ed2f1-25b7-402d-b0f8-cf73128aca34/scratchpad/chrome-axe",
  args: ["--no-first-run", "--no-default-browser-check"],
});

let total = 0;
for (const width of WIDTHS) {
  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    await page.goto(BASE + route, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 1600));
    // Let every reveal fire so axe sees the settled page, not opacity-0 content.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      const step = Math.round(innerHeight * 0.7);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo(0, y); await new Promise(r => setTimeout(r, 110));
      }
      scrollTo(0, 0);

      // Wait until nothing is part way through a reveal. Auditing colour while
      // an element sits at opacity 0.8 measures a blend, not the design.
      const settled = () => [...document.querySelectorAll(
        "[data-reveal-group] > *, [data-rail-item], [data-split], .btn, a, p, dd"
      )].every(el => {
        const o = parseFloat(getComputedStyle(el).opacity);
        return o === 0 || o > 0.99;
      });
      for (let i = 0; i < 60 && !settled(); i++) await new Promise(r => setTimeout(r, 100));
      await new Promise(r => setTimeout(r, 300));
    });
    await page.evaluate(axeSource);
    const res = await page.evaluate(async () =>
      await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
      }));
    const violations = res.violations.filter(v => v.impact !== "minor" || true);
    if (violations.length) {
      total += violations.length;
      console.log(`\n[FAIL] ${width}px ${route}`);
      for (const v of violations) {
        console.log(`   ${v.impact}: ${v.id} — ${v.help}`);
        v.nodes.slice(0, 3).forEach(n => {
          console.log(`      ${n.target.join(" ")}`);
          console.log(`      ${(n.failureSummary || "").split("\n").slice(0,3).join(" / ").slice(0,190)}`);
        });
      }
    } else console.log(`[ok]   ${width}px ${route}`);
    await page.close();
  }
}
await browser.close();
console.log(`\naxe-core: ${total} violation group(s) across ${WIDTHS.length * ROUTES.length} page/width runs`);
