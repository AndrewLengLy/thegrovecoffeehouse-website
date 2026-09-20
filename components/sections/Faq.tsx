import { faq } from "@/lib/faq";
import { BandLine } from "@/components/motion/BandLine";

/**
 * Native details/summary: keyboard operable, screen reader announced, no
 * JavaScript. Each question is a heading inside the summary so the list is
 * navigable by heading, and the answer is a plain paragraph. No dl: a
 * definition list may only hold dt, dd or div directly, and details is not one.
 */
export function Faq() {
  return (
    <section id="faq" className="rule-top scroll-mt-2">
      <div className="wrap section">
        <div className="band">
          <h2 className="t-label">Things people ask</h2>
          <BandLine />
          <span className="t-index text-muted-strong">{String(faq.length).padStart(2, "0")}</span>
        </div>

        <div className="mt-8 border-t border-chalk md:max-w-[52rem]">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className="t-item">{f.q}</h3>
                <span
                  aria-hidden="true"
                  className="t-index shrink-0 transition-transform duration-fast ease-standard group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="t-body max-w-[60ch] pb-5 text-chalk">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
