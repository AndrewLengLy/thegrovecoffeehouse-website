import type { MenuItem } from "@/lib/menu";
import { SEASON_LABEL } from "@/lib/menu";

/**
 * One panel on the seasonal rail.
 *
 * Square, heavy edged, no fill. It reads as an enamel sign rather than a card
 * floating on a page, and the internal structure never varies: index and season,
 * the name, one sensory line, then plainly what is in it and what it costs.
 */
export function MenuCard({ item, index }: { item: MenuItem; index?: number }) {
  const resting = !item.available;

  return (
    <article
      className={[
        "flex h-full flex-col border-2 p-5",
        resting ? "border-line-strong text-muted" : "border-ink",
      ].join(" ")}
      aria-label={resting ? `${item.name}, back next season` : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        {typeof index === "number" && (
          <span className={`t-index ${resting ? "text-muted" : "text-muted-strong"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {item.season && !resting && <span className="tag tag-season">{SEASON_LABEL[item.season]}</span>}
        {resting && <span className="tag tag-rest">Back next season</span>}
      </div>

      <h3 className={`t-item mt-4 ${resting ? "text-muted" : "text-ink"}`}>{item.name}</h3>

      <p
        className={`mt-2 text-[17px] leading-[1.35] ${
          resting ? "text-muted" : "text-seasonal-ink"
        }`}
      >
        {item.oneLiner}
      </p>

      <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-4">
        <p className={`text-[14px] leading-[1.5] ${resting ? "text-muted" : "text-ink"}`}>
          {item.whatsInIt}
        </p>
        {item.price && (
          <span className={`t-item shrink-0 tabular-nums ${resting ? "text-muted" : "text-ink"}`}>
            ${item.price}
          </span>
        )}
      </div>
    </article>
  );
}
