import { site } from "@/lib/site";
import { Photo } from "@/components/ui/Photo";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BandLine } from "@/components/motion/BandLine";
import { ScaleReveal } from "@/components/motion/ScaleReveal";

/**
 * The one large field of green on the site. Everything else is paper, so this
 * band is where the brand colour stops being a button and becomes a room.
 */
export function TheBeans() {
  return (
    <section id="the-beans" className="on-green scroll-mt-2">
      <div className="wrap section">
        <div className="band">
          <span className="t-label">The beans</span>
          <BandLine />
          <span className="t-label">
            {site.roaster.location}
          </span>
        </div>

        <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-start md:gap-12">
          <div className="md:col-span-7">
            <SplitHeading as="h2" className="t-display">
              Our beans come from down the road
            </SplitHeading>

            <Reveal className="mt-8 max-w-[38rem]">
              <p className="t-body text-chalk/90">
                We pour {site.roaster.name}, a roastery in {site.roaster.location}.
                Buying from people we can drive out and see means the coffee
                arrives fresh, and we always know who roasted it.
              </p>
              <p className="t-body mt-4 text-chalk/90">
                We like knowing the people we buy from. It is the same reason we
                would rather you got to know us.
              </p>
              <a
                href={site.roaster.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary mt-8"
              >
                Visit {site.roaster.name}
              </a>
            </Reveal>
          </div>

          <Reveal className="md:col-span-4 md:col-start-9">
            <div className="frame">
              <ScaleReveal>
              <Photo
                src={null}
                width={1000}
                height={1250}
                sizes="(min-width: 768px) 33vw, 100vw"
                alt="An espresso being pulled at The Grove Coffee House"
                brief="Portrait shot of coffee being made. The bar, a portafilter, or a pour. Hands in frame are good."
              />
              </ScaleReveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
