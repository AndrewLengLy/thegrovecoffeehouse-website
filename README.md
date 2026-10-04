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
| `components/motion/` | The GSAP wrappers. `Reveal` is the workhorse, `SplitHeading` is the masked headline, `Frame` opens a photograph upward on first view and drifts it against the scroll. |
| `components/sections/HeroIntro.tsx` | The home page opening: an olive field with the name and a small window of the hero photograph that opens out to fill the screen, once per visit. The starting states live in `globals.css` so they paint before JavaScript runs, with a 3.2s failsafe. |
| `components/ui/PinBoard.tsx` | The prints scattered round the Instagram heading, each drifting at its own speed. Each can be dragged anywhere in its section and stays where it is dropped; on touch, a sideways drag picks it up and a vertical one still scrolls. |
| `components/ui/PageHead.tsx` | How every inner page opens: a small label, the title in huge thin capitals, the opening lines in the right half. |
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

The hand drawn lines drawing in, the closable announcement strip, mobile nav focus containment
and Escape handling, the skip link, the hidden reward, the phone thumb bar, the menu jump bar,
dragging the pinned prints (mouse, touch, and staying inside their section), and that content
is still present with JavaScript disabled.

```bash
node qa/axe.mjs
```

axe-core against WCAG 2.1 and 2.2 AA on every route at two widths.

Every browser gate reads `BASE` (default `http://localhost:3000`) and `CHROME` (default: the
macOS Google Chrome path), so point them at whichever server and browser you have.

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
| Real photography | **Partly in.** `public/photos/` holds the shop's own shots: the drinks lineup and three summer close-ups (Instagram, 12 July 2026), the Snick-err Treat (22 September), the fall trio (23 September), and the room (joe.coffee listing, 800px; its EXIF says it came through Google, so confirm it is theirs). They fill the hero, a draggable "Fresh from our Instagram" board and the story card. Three drink-looking photos from the 30 June post were left out: they are Z's Creations candles, not drinks. Every other slot is an illustrated placeholder; its shot brief is in `data-brief` and printed under `next dev`. Tell the owners their photos are on the site. |
| The food menu | Needed. Their drinks board carries no food at all, so food has no prices. |
| The owners' story | Needed before the middle of `/our-story` can be written. |
| The logo file | Needed. See below. |
| Accessibility of the entrance | Needed. The page currently points people at the phone rather than guess. |
| Drink prices | Transcribed from a photo of their board. Confirm against the current one. |
| Weekday closing time | **Resolved.** Every source agrees: 7 to 5. |
| Saturday closing time | **Resolved to 5 PM.** The shop's own Instagram bio read "Monday - Saturday 7am - 5pm, Sunday - 7am - 3pm" on 23 September 2026, and the owner written source wins over the brief and joe.coffee's 3 PM. |
| Instagram handle | **Resolved, and corrected.** The brief's `@thegrovecoffeehouse` is a church coffee stand in Maryland. The cafe is `@thegrovecoffeehouse916`. |
| Events | **Sourced.** Three real events from the shop's own posts live in `lib/events.ts`, each linked to its post. Ask whether music night is becoming regular. |
| Summer board | **Sourced.** Eight summer 2026 drinks from their own post are in `lib/menu.ts`, no prices. Confirm which are still pouring. |
| Online ordering | **Resolved.** They do not have it, so directions and calling stay the primary actions. |

**The logo.** The mark exists: "The Grove Coffee House" in a green brush script with a coffee
branch and beans. What we do not have is a file. Ask the client for an SVG, or the original
Illustrator or EPS, or failing that a PNG on transparent at 1200px or wider, plus a reversed
version for the dark footer. Drop the paths into `site.logo` in `lib/site.ts` and the wordmark
swaps everywhere. Until then the site sets the name the way the board does: "The Grove Coffee
House" in Damion (the closest free match to the board's script) in the board's green, with the
sketch of beans beside it. The rest of the site takes the board's other marks too: red
typewriter items and prices, and a watercolour wash under the matcha list.

**The design direction (October 2026).** An editorial lodge layout, modelled on
tengilemalamala.com, laid over the board: a full bleed photograph under thin upper case
Fraunces, small typewriter labels over long light statements, an asymmetric twelve column grid
with offset photograph pairs, a scatter of prints round a centred heading, chip and arrow
buttons, and an olive footer, the colour of the chairs. Every photograph is the shop's own
(Instagram and the joe.coffee listing). The two biggest gaps are a wide photograph of the room
of at least 2400px, which would let the room run full bleed, and photographs of the drinks in
the favorites row.

`/our-story` is now shippable. It says only things that are true: family owned and independent,
the name, the seasonal board, the range of drinks that genuinely are on it, and the roaster. It
does not claim a founding narrative. The questions to ask the owners are listed in a comment at
the top of `app/our-story/page.tsx`, and their answers turn it into a fuller page.
