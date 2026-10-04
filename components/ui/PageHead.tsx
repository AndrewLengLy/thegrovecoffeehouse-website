import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * How every inner page opens, the way the lodge opens its own: a tiny label in
 * capitals, the title across the page in huge thin capitals that rise line by
 * line, and the opening lines set in the right half underneath.
 */
export function PageHead({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="wrap pb-14 pt-12 md:pb-20 md:pt-20">
      <p className="t-caps">{label}</p>
      <SplitHeading as="h1" onLoad className="t-display mt-6 max-w-[16ch] md:mt-8">
        {title}
      </SplitHeading>
      {children && (
        <div className="mt-10 grid md:mt-14 md:grid-cols-12 md:gap-x-8">
          <Reveal onLoad travel={8} className="md:col-span-7 md:col-start-6 lg:col-span-5 lg:col-start-7">
            {children}
          </Reveal>
        </div>
      )}
    </div>
  );
}
