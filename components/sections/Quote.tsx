import { site } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { HiddenLeaf } from "@/components/ui/HiddenLeaf";

/**
 * The lodge stops half way down its page for one long quotation in green,
 * centred. This is the same pause, and the words are the owners' own, from their Instagram
 * captions, which is the one place they write about the shop themselves.
 *
 * The leaf under it is a door (HiddenLeaf.tsx).
 */
export function Quote() {
  return (
    <section aria-label="In their words" className="relative">
      <div className="wrap section">
        <Reveal travel={16} className="mx-auto flex max-w-[48rem] flex-col items-center text-center">
          <figure>
            {/* Verbatim from a caption read on 19 September 2026. Nothing is
                joined or added: a quotation the owners did not write is worse
                than none. */}
            <blockquote className="t-statement-lg mx-auto max-w-[22ch] text-grove">
              <p>
                &ldquo;You&rsquo;ve helped us build the sweetest little
                community.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <cite className="t-caps not-italic">The Grove family</cite>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                data-event="instagram_click"
                data-event-location="quote"
                className="t-caps inline-flex min-h-6 items-center text-ink-soft hover:text-brick"
              >
                On Instagram, {site.instagram.handle}
              </a>
            </figcaption>
          </figure>
          <HiddenLeaf className="mt-6" />
        </Reveal>
      </div>
    </section>
  );
}
