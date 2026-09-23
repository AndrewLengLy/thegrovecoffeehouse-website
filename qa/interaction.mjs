import puppeteer from "puppeteer";
import { tmpdir } from "node:os";
import { join } from "node:path";
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE ?? "http://localhost:3000";
const browser = await puppeteer.launch({
  executablePath: CHROME, headless: "shell",
  userDataDir: join(tmpdir(), "grove-qa", "chrome-qa2"),
  args: ["--no-first-run", "--no-default-browser-check"],
});
const results = [];
const check = (name, pass, detail = "") => { results.push({ name, pass, detail }); };

/* ---------- 1. The hand drawn lines draw in, and the strip closes ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1200));

  const drawn = () => page.evaluate(() => {
    const all = [...document.querySelectorAll("[data-draw]")];
    const below = all.filter(el => el.getBoundingClientRect().top > innerHeight * 1.5);
    return { total: all.length, drawn: all.filter(el => el.dataset.drawn === "true").length,
             belowDrawn: below.filter(el => el.dataset.drawn === "true").length, below: below.length };
  });

  // A drawing far down the page must wait for the reader, or there is nothing
  // left to watch by the time they reach it.
  const before = await drawn();
  check("drawings below the fold wait to be drawn", before.below > 0 && before.belowDrawn === 0, JSON.stringify(before));

  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y <= document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
    await new Promise(r => setTimeout(r, 600));
  });
  const after = await drawn();
  check("every drawing is drawn once scrolled past", after.total > 5 && after.drawn === after.total, JSON.stringify(after));

  // Once drawn, every stroke must end visible, not stuck at its hidden dash
  // offset. The longest drawing is 1.6s plus a stagger of about 2s.
  await new Promise(r => setTimeout(r, 4000));
  const worst = await page.evaluate(() =>
    Math.max(...[...document.querySelectorAll('[data-draw] .draw')]
      .map(p => Math.abs(parseFloat(getComputedStyle(p).strokeDashoffset))))
  );
  check("every drawn stroke ends fully visible", worst < 0.001, String(worst));

  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 700));
  const closeBtn = await page.$("xpath/.//button[span[text()='Close announcement']]");
  const hadStrip = !!closeBtn;
  if (closeBtn) await closeBtn.click();
  await new Promise(r => setTimeout(r, 300));
  const stripGone = !(await page.$("xpath/.//button[span[text()='Close announcement']]"));
  check("announcement strip closes", hadStrip && stripGone);
  await page.close();
}

/* ---------- 2. Mobile nav: open, Escape, focus restore, containment ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 800, isMobile: true, hasTouch: true });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1200));

  const toggleSel = 'button[aria-controls="mobile-nav"]';
  await page.click(toggleSel);
  await new Promise(r => setTimeout(r, 350));

  const open = await page.evaluate(() => ({
    expanded: document.querySelector('button[aria-controls="mobile-nav"]').getAttribute("aria-expanded"),
    panelExists: !!document.getElementById("mobile-nav"),
    focusInPanel: !!document.getElementById("mobile-nav")?.contains(document.activeElement),
    bodyLocked: getComputedStyle(document.body).overflow === "hidden",
  }));
  check("mobile nav opens", open.expanded === "true" && open.panelExists, JSON.stringify(open));
  check("focus moves into panel", open.focusInPanel);
  check("background scroll locked", open.bodyLocked);

  // Tab through more elements than the panel holds; focus must stay inside.
  let escaped = false;
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    const inside = await page.evaluate(() =>
      !!document.getElementById("mobile-nav")?.contains(document.activeElement));
    if (!inside) { escaped = true; break; }
  }
  check("focus stays contained while open", !escaped);

  await page.keyboard.press("Escape");
  await new Promise(r => setTimeout(r, 350));
  const closed = await page.evaluate(() => ({
    expanded: document.querySelector('button[aria-controls="mobile-nav"]').getAttribute("aria-expanded"),
    panelExists: !!document.getElementById("mobile-nav"),
    focusOnToggle: document.activeElement === document.querySelector('button[aria-controls="mobile-nav"]'),
    bodyFree: getComputedStyle(document.body).overflow !== "hidden",
  }));
  check("Escape closes panel", closed.expanded === "false" && !closed.panelExists, JSON.stringify(closed));
  check("focus returns to the toggle", closed.focusOnToggle);
  check("scroll lock released", closed.bodyFree);
  await page.close();
}

/* ---------- 3. Skip link ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 900));
  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => {
    const a = document.activeElement;
    const r = a.getBoundingClientRect();
    return { text: (a.textContent || "").trim(), href: a.getAttribute("href"),
             w: Math.round(r.width), h: Math.round(r.height), visible: r.width > 24 && r.height > 24 };
  });
  check("skip link is first tab stop and becomes visible",
        skip.href === "#main" && skip.visible, JSON.stringify(skip));
  await page.close();
}

/* ---------- 4. The hidden reward ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1200));
  const before = await page.evaluate(() => {
    const n = document.getElementById("grove-note");
    return { hidden: n?.hidden, hasTooltip: !!document.querySelector('[aria-controls="grove-note"]')?.getAttribute("title") };
  });
  await page.evaluate(() => document.querySelector('[aria-controls="grove-note"]').click());
  await new Promise(r => setTimeout(r, 400));
  const after = await page.evaluate(() => {
    const n = document.getElementById("grove-note");
    return { hidden: n?.hidden, text: (n?.textContent || "").trim().slice(0, 60),
             name: document.querySelector('[aria-controls="grove-note"]').textContent.trim() };
  });
  check("reward starts hidden", before.hidden === true);
  check("reward has no visible tooltip", before.hasTooltip === false);
  check("reward opens on click", after.hidden === false, after.text);
  check("reward has an accessible name", after.name.length > 3, after.name);
  await page.close();
}

/* ---------- 5. Phone: the thumb bar comes and goes ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 800, isMobile: true, hasTouch: true });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1200));
  const scroll = async (y) => {
    await page.evaluate((y) => { document.documentElement.style.scrollBehavior = "auto"; window.scrollTo(0, y); }, y);
    await new Promise(r => setTimeout(r, 700));
  };

  const bar = () => page.evaluate(() => document.querySelector('aside[aria-label="Quick actions"]')?.dataset.visible);
  check("thumb bar hidden over the hero", (await bar()) === "false");

  const menuTop = await page.$eval("#board-heading", el => el.getBoundingClientRect().top + scrollY);
  await scroll(menuTop);
  check("thumb bar shows once past the hero", (await bar()) === "true");
  await scroll(999999);
  check("thumb bar leaves when the footer is on screen", (await bar()) === "false");
  await page.close();
}

/* ---------- 6. Phone: the menu jump bar ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 800, isMobile: true, hasTouch: true });
  await page.goto(BASE + "/menu", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1200));
  const scroll = async (y) => {
    await page.evaluate((y) => { document.documentElement.style.scrollBehavior = "auto"; window.scrollTo(0, y); }, y);
    await new Promise(r => setTimeout(r, 800));
  };
  const state = () => page.evaluate(() => {
    const n = document.querySelector(".jumpbar");
    return { shown: n.dataset.shown, top: Math.round(n.getBoundingClientRect().top),
             header: document.documentElement.dataset.header,
             active: n.querySelector('[aria-current="true"]')?.getAttribute("href") ?? null };
  });

  check("jump bar waits while the page index is on screen", (await state()).shown === "false");
  await scroll(3200);
  const down = await state();
  check("jump bar shows mid menu and takes the header's place", down.shown === "true" && down.top === 0 && down.header === "hidden", JSON.stringify(down));
  check("jump bar names the current section", !!down.active, String(down.active));
  await scroll(2900);
  const up = await state();
  check("jump bar drops below the header when it returns", up.header === "shown" && up.top >= 60, JSON.stringify(up));
  await scroll(999999);
  check("jump bar leaves once the categories end", (await state()).shown === "false");
  await page.close();
}

/* ---------- 7. JavaScript disabled: nothing may be invisible ---------- */
{
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 800));
  // evaluate needs JS; check via content instead
  const html = await page.content();
  const hasHeadline = html.includes("Coffee runs, matcha dates, long mornings.");
  const hasMenuLink = html.includes('href="/menu"');
  check("content present with JavaScript disabled", hasHeadline && hasMenuLink);
  await page.close();
}

await browser.close();
let fail = 0;
for (const r of results) {
  if (!r.pass) fail++;
  console.log(`${r.pass ? "[ok]  " : "[FAIL]"} ${r.name}${r.detail ? "  :: " + r.detail : ""}`);
}
console.log(`\n${fail} failing of ${results.length}`);
