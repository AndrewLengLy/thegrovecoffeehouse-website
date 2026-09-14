import { site, hours } from "@/lib/site";

/**
 * Questions people actually ask, answered only where the answer is confirmed.
 * Rendered as a plain <details> list on the Visit page and mirrored as FAQPage
 * structured data, because this is exactly the shape an answer engine wants.
 */
export const faq: { q: string; a: string }[] = [
  {
    q: "What are your hours?",
    a: `${hours[0].label}, ${hours[0].time}. ${hours[1].label}, ${hours[1].time}. The weekend close is two hours earlier than the weekday close, and holiday hours can differ, so call ${site.phone.display} on a holiday.`,
  },
  {
    q: "Where exactly are you?",
    a: `${site.addressLine}. We are in Suite 100 of the retail center on Sierra College Blvd, with parking in the lot out front.`,
  },
  {
    q: "Can I work from The Grove?",
    a: "Yes. There are outlets, seating inside and out, and nobody clears your table at the ninety minute mark. People work here for whole mornings.",
  },
  {
    q: "Do you serve food?",
    a: "Yes. Avocado toast, an everything bagel, scones, a pastrami sandwich and cookies, alongside the drinks. Ask for the food menu at the counter.",
  },
  {
    q: "Can I order online?",
    a: `Not at the moment. Order at the counter, or call ${site.phone.display} ahead if you are in a hurry.`,
  },
  {
    q: "Whose coffee do you pour?",
    a: `${site.roaster.name}, a roastery in ${site.roaster.location}. Close enough to drive to.`,
  },
  {
    q: "Is the menu the same all year?",
    a: "No. There is a standing board, and a seasonal board that rotates. Fall brings drinks like Elphaba's Brew and Apple Hill; summer brought a lineup of its own. If you are coming for something specific, call first.",
  },
  {
    q: "Do you host events?",
    a: `Sometimes. There have been music nights and a birthday weekend with special drinks. Anything upcoming is posted first on Instagram, ${site.instagram.handle}.`,
  },
];

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
