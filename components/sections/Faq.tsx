import { faq } from "@/lib/faq";

/**
 * Native details/summary: keyboard operable, screen reader announced, no
 * JavaScript. Each question is a heading inside the summary so the list is
 * navigable by heading, and the answer is a plain paragraph. No dl: a
 * definition list may only hold dt, dd or div directly, and details is not one.
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-2">
      <div className="wrap section grid gap-8 lg:grid-cols-12">
        <h2 id="faq-heading" className="t-h2 lg:col-span-4">
          Things people ask
        </h2>

        <div className="border-t border-pencil/50 lg:col-span-7 lg:col-start-6">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-pencil/50">
              <summary className="flex min-h-12 cursor-pointer list-none items-baseline justify-between gap-6 py-3.5 [&::-webkit-details-marker]:hidden">
                <h3 className="t-h3 text-[21px]">{f.q}</h3>
                <span
                  aria-hidden="true"
                  className="t-price shrink-0 transition-transform duration-fast ease-standard group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="t-body max-w-[60ch] pb-5">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
