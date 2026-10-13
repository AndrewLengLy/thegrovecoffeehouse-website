import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * How every inner page opens, the way the lodge opens its own: a tiny label in
 * capitals, the title across the page in huge thin capitals that rise line by
 * line, and the opening lines straight underneath on the same left edge.
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
        <Reveal onLoad travel={8} className="mt-8 max-w-[44rem] md:mt-10">
          {children}
        </Reveal>
      )}
    </div>
  );
}
