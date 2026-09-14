import { Announcement } from "@/components/sections/Announcement";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { SeasonalSection } from "@/components/sections/SeasonalSection";
import { TheRoom } from "@/components/sections/TheRoom";
import { Events } from "@/components/sections/Events";
import { TheBeans } from "@/components/sections/TheBeans";
import { VisitBlock } from "@/components/sections/VisitBlock";
import { marqueePhrases } from "@/lib/menu";
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
      <Announcement />
      <Hero />
      <Marquee phrases={marqueePhrases} />
      <SeasonalSection />
      <TheRoom />
      <Events />
      <TheBeans />
      <VisitBlock />
    </>
  );
}
