# The Grove Coffee House

Website for The Grove Coffee House, 9260 Sierra College Blvd STE 100, Roseville, CA 95661.
Next.js App Router, TypeScript, Tailwind v4, GSAP. Built by Parabox Digital.

## Running it

```bash
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Where things live

| Path | What it is |
| --- | --- |
| `lib/site.ts` | Every business fact. Address, phone, hours, links, geo, conversion event names. Nothing is hardcoded elsewhere. |
| `lib/menu.ts` | The menu, as typed data. The signature system. Add and remove items here and every surface updates. |
| `lib/events.ts` | Things that have happened at the shop, each sourced to an Instagram post. Feeds the home page Events section. |
| `components/motion/` | The GSAP wrappers. `Reveal` is the workhorse, `SplitHeading` is the masked headline. |
| `components/sections/SeasonalRail.tsx` | The one signature scroll moment. Pinned horizontal pass above 1024px; below that, a native swipe with snap points, a progress rule and previous and next buttons. |
| `lib/open-status.ts` | "Open now, until 5 PM", worked out in Roseville's time zone in the browser. Feeds the hero plate, the phone action bar and the Today marker in `HoursList`. |
| `components/layout/MobileActionBar.tsx` | The phone thumb bar: open status, call, directions. Appears past the hero, leaves at the footer. |
| `components/ui/MenuJumpBar.tsx` | The sticky section bar on `/menu`. Takes over from the page index once it scrolls away and follows the header up and down. |
| `qa/` | The delivery gates. See below. |

## The delivery gates

All three must pass before anything ships. Start the site first, then:

```bash
node qa/visual.mjs
```

Layout and structure at 375, 768, 1024 and 1440 across every route. Checks horizontal overflow,
stuck-invisible content, heading order, missing alt text, touch target sizes and console errors.
Set `REDUCED=1` to run the same sweep with `prefers-reduced-motion` enabled, which is a separate
hard gate, not an afterthought.

```bash
node qa/interaction.mjs
```

The pinned rail, keyboard reachability inside it, mobile nav focus containment and Escape
handling, the skip link, the hidden reward, the phone rail and thumb bar, the menu jump bar,
and that content is still present with JavaScript disabled.

```bash
node qa/axe.mjs
```

axe-core against WCAG 2.1 and 2.2 AA on every route at two widths.

Every browser gate reads `BASE` (default `http://localhost:3000`) and `CHROME` (default: the
macOS Google Chrome path), so point them at whichever server and browser you have.

One thing that will look like a bug and is not: a full-page screenshot of `/` shows a tall
blank band under the seasonal rail. That is the ScrollTrigger pin spacer. Full-page capture
sets the viewport to the whole document, so the rail pins at the top of its scroll range and
the rest of the range is empty. To see the rail as a visitor does, screenshot the viewport at
successive scroll positions inside the pin range instead. `qa/interaction.mjs` asserts the
pinned section is actually on screen while scrolling, which is the check that matters.

```bash
node qa/seo.mjs
```

Parses every JSON-LD block on every page, checks each page carries the types it promises,
refuses any schema price that is not in `lib/menu.ts`, and checks `/llms.txt`, `/robots.txt`
and `/sitemap.xml`.

## Deploying

The repo is connected to the Vercel project `thegrovecoffeehouse-website` on the Parabox Digital
team. A push to `main` deploys to production; any other branch or pull request gets its own
preview URL. Test against the production alias, https://thegrovecoffeehouse-website.vercel.app,
not a per-deployment URL, which sits behind Vercel's login.

## Going live

`robots.txt` disallows everything until `NEXT_PUBLIC_SITE_URL` is set, so a `.vercel.app`
preview can never become the indexed home of the business. Set that variable to the real
domain in Vercel and redeploy: canonicals, sitemap, Open Graph URLs and robots all switch at
once. `/llms.txt` is generated from the same data as the pages for AI crawlers.

Lighthouse is run against a production build (`npm run start`), mobile form factor, and has to
clear 90 in all four categories.

## Open items before launch

Search the codebase for `TODO(andrew)`. What is genuinely still open:

| Item | Status |
| --- | --- |
| The domain | Needed. Drives `metadataBase`, the sitemap, robots and every canonical. |
| Real photography | Needed. Every slot is a labelled placeholder holding the right ratio. |
| The food menu | Needed. Their drinks board carries no food at all, so food has no prices. |
| The owners' story | Needed before the middle of `/our-story` can be written. |
| The logo file | Needed. See below. |
| Accessibility of the entrance | Needed. The page currently points people at the phone rather than guess. |
| Drink prices | Transcribed from a photo of their board. Confirm against the current one. |
| Weekday closing time | **Resolved.** Every source agrees: 7 to 5. |
| Saturday closing time | **In conflict.** Brief and joe.coffee say 3 PM; the shop's own Instagram bio says 5 PM. Shipping 3 PM (the safer error) until the owners confirm. |
| Instagram handle | **Resolved, and corrected.** The brief's `@thegrovecoffeehouse` is a church coffee stand in Maryland. The cafe is `@thegrovecoffeehouse916`. |
| Events | **Sourced.** Three real events from the shop's own posts live in `lib/events.ts`, each linked to its post. Ask whether music night is becoming regular. |
| Summer board | **Sourced.** Eight summer 2026 drinks from their own post are in `lib/menu.ts`, no prices. Confirm which are still pouring. |
| Online ordering | **Resolved.** They do not have it, so directions and calling stay the primary actions. |

**The logo.** The mark exists: "The Grove Coffee House" in a green brush script with a coffee
branch and beans. What we do not have is a file. Ask the client for an SVG, or the original
Illustrator or EPS, or failing that a PNG on transparent at 1200px or wider, plus a reversed
version for the dark footer. Drop the paths into `site.logo` in `lib/site.ts` and the wordmark
swaps everywhere. Until then the site sets the name in its own signage face rather than
shipping a photograph of the framed board from inside the shop.

`/our-story` is now shippable. It says only things that are true: family owned and independent,
the name, the seasonal board, the range of drinks that genuinely are on it, and the roaster. It
does not claim a founding narrative. The questions to ask the owners are listed in a comment at
the top of `app/our-story/page.tsx`, and their answers turn it into a fuller page.
