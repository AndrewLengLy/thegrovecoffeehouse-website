import type { MenuItem } from "@/lib/menu";
import { SEASON_LABEL } from "@/lib/menu";

/**
 * One line on the printed menu: the name in the board's typewriter capitals
 * with the price in red at a fixed column, an italic line of what it tastes
 * like, and the fine print of what is in it.
 *
 * An item with no price is not a bug. It is a drink customers have named that
 * is not on the current board, so the honest thing is to say to ask rather
 * than to quote a number we do not have.
 */
export function MenuRow({ item }: { item: MenuItem; index?: number }) {
  const resting = !item.available;

  return (
    <li
      id={item.slug}
      className={`scroll-mt-16 grid grid-cols-[minmax(0,1fr)_4.5rem] items-baseline gap-x-4 ${
        resting ? "text-ink-soft" : ""
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <h3 className="t-item">{item.name}</h3>
        {item.season && !resting && <span className="tag tag-season">{SEASON_LABEL[item.season]}</span>}
        {resting && <span className="tag tag-rest">Back next season</span>}
      </div>

      <span className={`t-price ${resting ? "" : "text-brick-deep"}`}>
        {item.price ? `$${item.price}` : resting ? null : "Ask"}
      </span>

      <p className="col-span-2 mt-1 max-w-[46ch] text-[16px] italic leading-[1.3]">{item.oneLiner}</p>
      <p className="t-note col-span-2 mt-1 max-w-[46ch]">{item.whatsInIt}</p>
    </li>
  );
}
