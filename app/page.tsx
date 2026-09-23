import { Hero } from "@/components/sections/Hero";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { TheRoom } from "@/components/sections/TheRoom";
import { Events } from "@/components/sections/Events";
import { Favorites } from "@/components/sections/Favorites";
import { FromTheGrove } from "@/components/sections/FromTheGrove";
import { Squiggle } from "@/components/ui/Squiggle";
import { events } from "@/lib/events";
import { JsonLd } from "@/components/JsonLd";
import { absolute, businessNode, postalAddress } from "@/lib/seo";

function eventSchema() {
  return events.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.blurb,
    startDate: e.time ? `${e.date}T${to24(e.time)}` : e.date,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: businessNode().name, address: postalAddress() },
    organizer: { "@type": "Organization", name: businessNode().name, url: absolute("/") },
    url: e.source,
  }));
}

/** "7:00 PM" to "19:00". */
function to24(t: string) {
  const [hm, ap] = t.split(" ");
  const [h, m] = hm.split(":").map(Number);
  const hh = (h % 12) + (ap === "PM" ? 12 : 0);
  return `${String(hh).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export default function Home() {
  return (
    <>
      {eventSchema().map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <Hero />
      <Rule />
      <MenuPreview />
      <Rule />
      <TheRoom />
      <Rule />
      <Events />
      <Rule />
      <Favorites />
      <Rule />
      <FromTheGrove />
    </>
  );
}

/** The hand drawn break between sections, inside the page gutter. */
function Rule() {
  return (
    <div className="wrap">
      <Squiggle />
    </div>
  );
}
