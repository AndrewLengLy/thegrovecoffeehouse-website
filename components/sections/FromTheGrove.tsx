import Link from "next/link";
import { site } from "@/lib/site";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { Doodle } from "@/components/ui/Doodle";
import { HiddenLeaf } from "@/components/ui/HiddenLeaf";

/**
 * Two cards, set the way the reference sets its journal: a portrait print, an
 * italic title with a label in capitals on the same line, a few lines, and a
 * red tag to read on. One is about the family, one is about who roasts for us.
 */
const cards = [
  {
    key: "story",
    label: "Our story",
    title: "Three years on Sierra College Blvd",
    body: "We opened in the summer of 2023, and this August we turned three. Three years of coffee runs, matcha dates, study sessions and catch ups, and a lot of familiar faces.",
    href: "/our-story",
    cta: "Read more",
    external: false,
    /* The room, until the owners send the photograph of themselves this card
       is waiting for. */
    src: "/photos/grove-interior.jpg" as string | null,
    alt: "The room at The Grove Coffee House: olive green chairs at wood tables under a red ceiling grid",
    brief: "The owners behind the counter, candid rather than posed. Portrait crop.",
    doodle: "table" as const,
  },
  {
    key: "beans",
    label: "Roaster",
    title: `Beans from ${site.roaster.name}`,
    body: `We pour ${site.roaster.name}, a roastery in ${site.roaster.location}. Buying from people we can drive out and see means the coffee arrives fresh, and we always know who roasted it.`,
    href: site.roaster.url,
    cta: "Visit them",
    external: true,
    src: null as string | null,
    alt: "An espresso being pulled at The Grove Coffee House",
    brief: "Coffee being made at the bar. A portafilter or a pour, hands in frame. Portrait crop.",
    doodle: "beans" as const,
  },
];

export function FromTheGrove() {
  return (
    <section id="the-beans" aria-labelledby="about-heading" className="scroll-mt-2">
      <div className="wrap section grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col lg:col-span-4 lg:pr-8">
          <h2 id="about-heading" className="t-h2">
            Get to know us
          </h2>
          <p className="t-body mt-3 max-w-[42ch]">
            We are one family and one room on Sierra College Blvd, pouring beans
            roasted just down the road. Here is a little more about who we are,
            and who we buy from. Have you been in yet?
          </p>
          <Link href="/our-story" className="btn mt-4 self-start">
            Our story
          </Link>

          <div className="mt-10 flex items-end gap-2 lg:mt-auto lg:pl-10">
            <Doodle name="table" className="h-28 w-28 md:h-32 md:w-32" />
            <HiddenLeaf className="pb-2" />
          </div>
        </div>

        <Reveal className="grid gap-10 sm:grid-cols-2 sm:gap-6 lg:col-span-8">
          {cards.map((c) => (
            <article key={c.key}>
              <div className="print aspect-[4/3] sm:aspect-[3/4]">
                <Photo
                  src={c.src}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  width={1000}
                  height={1333}
                  alt={c.alt}
                  brief={c.brief}
                  doodle={c.doodle}
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <h3 className="t-h3">{c.title}</h3>
                <span className="t-caps shrink-0 text-[13px]">{c.label}</span>
              </div>
              <p className="t-body mt-2 max-w-[48ch]">{c.body}</p>
              {c.external ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn mt-3">
                  {c.cta}
                </a>
              ) : (
                <Link href={c.href} className="btn mt-3">
                  {c.cta}
                </Link>
              )}
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
