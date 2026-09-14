import { site, hours, hoursCaveat } from "@/lib/site";
import { menu, CATEGORY_ORDER, CATEGORY_LABEL, milkOptions, extras } from "@/lib/menu";
import { events, formatEventDate } from "@/lib/events";
import { faq } from "@/lib/faq";

export const dynamic = "force-static";

/**
 * /llms.txt. A plain text account of the business for AI crawlers and answer
 * engines, built from the same data as the pages so it can never drift from
 * them. Everything in here is confirmed or sourced; nothing is padded.
 */
export async function GET() {
  const L: string[] = [];
  const line = (s = "") => L.push(s);

  line(`# ${site.name}`);
  line();
  line(`> Family owned, independent coffee house at ${site.addressLine}. Open seven days from 7:00 AM. Beans from ${site.roaster.name} in ${site.roaster.location}. Seasonal drinks, a real food menu, outlets, and seating inside and out.`);
  line();
  line(`- Website: ${site.url}`);
  line(`- Phone: ${site.phone.display}`);
  line(`- Address: ${site.addressLine}`);
  line(`- Instagram: ${site.instagram.url}`);
  line(`- Directions: ${site.directionsUrl}`);
  line(`- Opened: summer 2023`);
  line(`- Online ordering: not available. Order at the counter.`);
  line();
  line(`## Hours`);
  for (const h of hours) line(`- ${h.label}: ${h.time}`);
  line(`- ${hoursCaveat}`);
  line();
  line(`## Menu`);
  line(`Prices in US dollars, from the board in the shop. Items marked "ask" rotate and have no listed price.`);
  for (const c of CATEGORY_ORDER) {
    const items = menu.filter((i) => i.category === c);
    if (!items.length) continue;
    line();
    line(`### ${CATEGORY_LABEL[c]}`);
    for (const i of items) {
      const price = i.price ? `$${i.price}` : i.available ? "ask" : "back next season";
      line(`- ${i.name} (${price}): ${i.whatsInIt}`);
    }
  }
  line();
  line(`### Milk and extras`);
  for (const m of milkOptions) line(`- ${m}`);
  for (const e of extras) line(`- ${e}`);
  line();
  line(`## Events`);
  line(`Posted first on Instagram. Recent:`);
  for (const e of events) {
    const d = formatEventDate(e);
    line(`- ${d.day} ${d.month} ${d.year}: ${e.title}. ${e.blurb} Source: ${e.source}`);
  }
  line();
  line(`## Questions people ask`);
  for (const f of faq) {
    line(`- Q: ${f.q}`);
    line(`  A: ${f.a}`);
  }
  line();
  line(`## Pages`);
  line(`- ${site.url}/ : home`);
  line(`- ${site.url}/menu : the whole board with prices`);
  line(`- ${site.url}/visit : hours, directions, parking, questions`);
  line(`- ${site.url}/our-story : who they are`);
  line();

  return new Response(L.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
