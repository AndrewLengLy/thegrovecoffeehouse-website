import puppeteer from "puppeteer";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "/private/tmp/claude-501/-Users-andrew-thegrovecoffeehouse-website/978ed2f1-25b7-402d-b0f8-cf73128aca34/scratchpad/shots";
const REDUCED = process.env.REDUCED === "1";
mkdirSync(OUT, { recursive: true });

const WIDTHS = (process.env.WIDTHS ?? "375,768,1024,1440").split(",").map(Number);
const ROUTES = (process.env.ROUTES ?? "/,/menu,/visit,/our-story,/definitely-not-a-page").split(",");

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  userDataDir: "/private/tmp/claude-501/-Users-andrew-thegrovecoffeehouse-website/978ed2f1-25b7-402d-b0f8-cf73128aca34/scratchpad/chrome-qa",
  args: ["--no-first-run", "--no-default-browser-check", "--disable-features=Translate"],
});

const report = [];

for (const width of WIDTHS) {
  for (const route of ROUTES) {
    const page = await browser.newPage();
    const errors = [];
    page.on("console", (m) => {
      if (m.type() !== "error") return;
      const t = m.text();
      // The 404 route legitimately responds 404; that is the test, not a defect.
      if (t.includes("status of 404")) return;
      errors.push(t.slice(0, 300));
    });
    page.on("pageerror", (e) => errors.push("PAGEERROR " + String(e).slice(0, 300)));

    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    if (REDUCED) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

    await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, REDUCED ? 600 : 1800));

    // Walk the page so every scroll reveal has actually had its chance to fire.
    // Auditing without scrolling would flag below-fold content as broken when it
    // is simply waiting, which is the design.
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      const step = Math.round(window.innerHeight * 0.7);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 130));
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
      await new Promise((r) => setTimeout(r, 500));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });

    const audit = await page.evaluate(() => {
      const de = document.documentElement;
      const overflowers = [];
      const vw = de.clientWidth;
      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > vw + 1.5 || r.left < -1.5)) {
          const tag = el.tagName.toLowerCase();
          const cls = (typeof el.className === "string" ? el.className : "").slice(0, 70);
          overflowers.push(`${tag}.${cls} [${Math.round(r.left)}..${Math.round(r.right)}]`);
        }
      });

      // Anything that ended up invisible after motion should have settled.
      const stuck = [...document.querySelectorAll("[data-reveal-group] > *, [data-rail-item], [data-split]")]
        .filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.95)
        .map((e) => e.tagName + "." + String(e.className).slice(0, 50));

      const headings = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => ({
        level: +h.tagName[1],
        text: (h.getAttribute("aria-label") || h.textContent || "").trim().slice(0, 60),
      }));

      const imgsNoAlt = [...document.querySelectorAll("img")]
        .filter((i) => i.getAttribute("alt") === null)
        .map((i) => i.currentSrc || i.src);

      // Touch targets on small screens.
      // WCAG 2.2 SC 2.5.8 exempts targets inline in a sentence, and elements
      // that are not visible (the skip link until it is focused).
      const isInlineInText = (e) => {
        const p = e.parentElement;
        if (!p) return false;
        const d = getComputedStyle(p).display;
        if (!["block", "paragraph", "inline", "flow-root"].includes(d)) return false;
        const own = (e.textContent || "").trim();
        const all = (p.textContent || "").trim();
        return all.length > own.length + 4;
      };
      const small = [...document.querySelectorAll("a,button,[role=button]")]
        .filter((e) => {
          const r = e.getBoundingClientRect();
          if (r.width <= 1 || r.height <= 1) return false;      // sr-only
          if (e.closest(".sr-only")) return false;
          if (isInlineInText(e)) return false;                   // inline exception
          return r.height < 24 || r.width < 24;
        })
        .map((e) => `${e.tagName} "${(e.textContent || "").trim().slice(0, 28)}" ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`);

      return {
        scrollW: de.scrollWidth, clientW: vw,
        horizontalOverflow: de.scrollWidth > vw + 1,
        overflowers: overflowers.slice(0, 8),
        stuck: stuck.slice(0, 8),
        h1Count: headings.filter((h) => h.level === 1).length,
        headings,
        imgsNoAlt,
        smallTargets: small.slice(0, 8),
        title: document.title,
      };
    });

    const name = `${width}${REDUCED ? "-reduced" : ""}${route === "/" ? "-home" : route.replace(/\//g, "-")}`;
    await page.screenshot({ path: join(OUT, name + ".png"), fullPage: true });

    report.push({ width, route, reduced: REDUCED, ...audit, errors });
    await page.close();
  }
}

await browser.close();

let fails = 0;
for (const r of report) {
  const problems = [];
  if (r.horizontalOverflow) problems.push(`H-OVERFLOW ${r.scrollW}>${r.clientW} :: ${r.overflowers.join(" | ")}`);
  if (r.stuck.length) problems.push(`STUCK-INVISIBLE: ${r.stuck.join(" | ")}`);
  if (r.h1Count !== 1) problems.push(`H1 COUNT ${r.h1Count}`);
  if (r.imgsNoAlt.length) problems.push(`IMG NO ALT: ${r.imgsNoAlt.join(",")}`);
  if (r.smallTargets.length) problems.push(`SMALL TARGET: ${r.smallTargets.join(" | ")}`);
  if (r.errors.length) problems.push(`CONSOLE: ${r.errors.join(" | ")}`);
  // heading order
  let prev = 0; const skips = [];
  for (const h of r.headings) { if (prev && h.level > prev + 1) skips.push(`h${prev}->h${h.level} "${h.text}"`); prev = h.level; }
  if (skips.length) problems.push(`HEADING SKIP: ${skips.join(" | ")}`);

  if (problems.length) { fails++; console.log(`\n[FAIL] ${r.width}px ${r.route}${r.reduced ? " (reduced)" : ""}`); problems.forEach((p) => console.log("   " + p)); }
  else console.log(`[ok]   ${r.width}px ${r.route}${r.reduced ? " (reduced)" : ""}`);
}
console.log(`\n${fails} of ${report.length} page/width combinations have findings. Shots: ${OUT}`);
