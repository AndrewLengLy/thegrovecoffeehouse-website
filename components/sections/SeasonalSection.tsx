import Link from "next/link";
import { railItems, seasonalItems, menuCaveat } from "@/lib/menu";
import { SeasonalRail } from "@/components/sections/SeasonalRail";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { BandLine } from "@/components/motion/BandLine";

/**
 * The signature section. The seasonal list is the whole differentiator of this
 * business, and until now it lived in an Instagram grid. Here it is the largest
 * thing on the page.
 */
export function SeasonalSection() {
  return (
    <section id="seasonal" className="section scroll-mt-24">
      <div className="wrap">
        <div className="band">
          <span className="t-label">Now pouring</span>
          <BandLine />
          <span className="t-label text-muted-strong">
            {seasonalItems.filter((i) => i.available).length} seasonal on the board
          </span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
          <SplitHeading as="h2" className="t-h2 md:col-span-6 lg:col-span-7">
            The board changes. That is the whole idea.
          </SplitHeading>
          <p className="t-body text-muted md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">{menuCaveat}</p>
        </div>
      </div>

      <div className="mt-10 md:mt-14">
        <SeasonalRail items={railItems} />
      </div>

      <div className="wrap mt-10 md:mt-14">
        <Link href="/menu" className="btn btn-primary">
          See the whole board
        </Link>
      </div>
    </section>
  );
}
