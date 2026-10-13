import { site } from "@/lib/site";

/**
 * Questions people actually ask, answered only where the answer is confirmed.
 * Rendered as a plain <details> list on the Visit page and mirrored as FAQPage
 * structured data, because this is exactly the shape an answer engine wants.
 */
export const faq: { q: string; a: string }[] = [
  {
    q: "Can I work from The Grove?",
    a: "Yes, and plenty of people do. There are outlets, seating inside and out, and nobody watching the clock. Whole mornings are normal here.",
  },
  {
    q: "Do you serve food?",
    a: "Yes. Avocado toast, an everything bagel, scones, a pastrami sandwich and cookies, alongside the drinks. Ask us for the food menu at the counter.",
  },
  {
    q: "Can I order online?",
    a: `Not yet. Order at the counter, or give us a call on ${site.phone.display} ahead of time if you are in a hurry.`,
  },
  {
    q: "Is the menu the same all year?",
    a: "No, and that is half the fun. There is a standing board, and a seasonal one that changes. This fall it is the Snick-err Treat, the Dracula Fizz and a few more, and summer had a lineup of its own. If you are coming for something in particular, call us first.",
  },
  {
    q: "Do you host events?",
    a: `Sometimes. We have had music nights, a craft night and a birthday weekend with drinks made for the occasion. Anything coming up goes on Instagram first, ${site.instagram.handle}.`,
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
