import puppeteer from "puppeteer";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE ?? "http://localhost:3000";
const browser = await puppeteer.launch({
  executablePath: CHROME, headless: "shell",
  userDataDir: "/private/tmp/claude-501/-Users-andrew-thegrovecoffeehouse-website/978ed2f1-25b7-402d-b0f8-cf73128aca34/scratchpad/chrome-qa2",
  args: ["--no-first-run", "--no-default-browser-check"],
});
const results = [];
const check = (name, pass, detail = "") => { results.push({ name, pass, detail }); };

/* ---------- 1. The signature pinned horizontal pass ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1500));

  const before = await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    const t = document.querySelector("[data-rail-section] [data-rail-item]")?.parentElement;
    return { x: t ? t.getBoundingClientRect().left : null,
             pinned: document.querySelector("[data-rail-section]")?.dataset.pinned ?? null };
  });

  // Scroll deep into the pinned range.
  await page.evaluate(async () => {
    const sec = document.querySelector("[data-rail-section]");
    const top = window.scrollY + sec.getBoundingClientRect().top;
    for (let i = 0; i <= 30; i++) { window.scrollTo(0, top + i * 90); await new Promise(r => setTimeout(r, 40)); }
    await new Promise(r => setTimeout(r, 900));
  });

  const after = await page.evaluate(() => {
    const t = document.querySelector("[data-rail-section] [data-rail-item]")?.parentElement;
    return { x: t ? t.getBoundingClientRect().left : null };
  });

  check("rail pins at 1440", before.pinned === "true", `data-pinned=${before.pinned}`);
  check("rail scrubs horizontally", after.x !== null && before.x !== null && after.x < before.x - 100,
        `left ${Math.round(before.x)} -> ${Math.round(after.x)}`);

  // The check that was missing. A pin can scrub perfectly sideways while the
  // whole fixed section sits thousands of pixels above the viewport, which is
  // exactly what a transformed ancestor does to position: fixed. So: while
  // pinned, at least one card must actually be on screen.
  const visible = await page.evaluate(() => {
    const sec = document.querySelector("[data-rail-section]");
    const r = sec.getBoundingClientRect();
    const cards = [...document.querySelectorAll("[data-rail-item]")].map(c => c.getBoundingClientRect());
    const onScreen = cards.filter(c => c.left < innerWidth && c.right > 0 && c.top < innerHeight && c.bottom > 0).length;
    return { pos: getComputedStyle(sec).position, secTop: Math.round(r.top), onScreen, total: cards.length };
  });
  check("pinned rail is actually on screen",
        visible.pos === "fixed" && visible.secTop >= -10 && visible.secTop <= innerHeightGuess(visible) && visible.onScreen > 0,
        JSON.stringify(visible));
  function innerHeightGuess() { return 900; }

  // Keyboard reachability: focusing a far card should bring it into view.
  const focusJump = await page.evaluate(async () => {
    const items = [...document.querySelectorAll("[data-rail-item]")];
    const last = items[items.length - 1];
    const btn = document.createElement("button");
    btn.textContent = "probe"; last.appendChild(btn);
    const yBefore = window.scrollY;
    btn.focus();
    await new Promise(r => setTimeout(r, 400));
    const rect = last.getBoundingClientRect();
    const res = { yBefore, yAfter: window.scrollY, left: Math.round(rect.left), vw: innerWidth };
    btn.remove();
    return res;
  });
  check("focus inside pinned rail scrolls it into view",
        focusJump.yAfter !== focusJump.yBefore && focusJump.left < focusJump.vw,
        JSON.stringify(focusJump));
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

/* ---------- 5. JavaScript disabled: nothing may be invisible ---------- */
{
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(false);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await new Promise(r => setTimeout(r, 800));
  const noJs = await page.evaluate ? null : null;
  // evaluate needs JS; check via content instead
  const html = await page.content();
  const hasHeadline = html.includes("Good coffee. A warm room. An open outlet.");
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
