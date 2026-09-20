import type { MenuItem } from "@/lib/menu";
import { SEASON_LABEL } from "@/lib/menu";

/**
 * One line on the board.
 *
 * The menu page is a board, not a grid of cards. Rows are numbered and separated
 * by a rule, with the price set right against the margin the way a printed menu
 * does it, so a column of prices is scannable on its own.
 *
 * An item with no price is not a bug. It is a drink customers have named that is
 * not on the current board, so the honest thing is to say to ask rather than to
 * quote a number we do not have.
 */
export function MenuRow({ item, index }: { item: MenuItem; index: number }) {
  const resting = !item.available;

  return (
    <li
      id={item.slug}
      className={[
        "scroll-mt-12 grid grid-cols-[2.25rem_1fr_auto] gap-x-3 border-t border-chalk py-5",
        "md:grid-cols-[3rem_minmax(0,22rem)_minmax(0,1fr)_5.5rem] md:gap-x-8",
        resting ? "text-muted" : "",
      ].join(" ")}
    >
      <span className={`t-index pt-1.5 ${resting ? "text-muted" : "text-muted-strong"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        {/* On a phone the tag always sits under the name. Letting it wrap
            inline put it beside some names and under others, so the column
            had no rhythm. From tablet up there is room to keep it inline. */}
        <div className="flex flex-col items-start gap-1.5 md:flex-row md:flex-wrap md:items-baseline md:gap-x-3 md:gap-y-2">
          <h3 className={`t-item ${resting ? "text-muted" : "text-chalk"}`}>{item.name}</h3>
          {item.season && !resting && (
            <span className="tag tag-season">{SEASON_LABEL[item.season]}</span>
          )}
          {resting && <span className="tag tag-rest">Back next season</span>}
        </div>
        <p
          className={`mt-1.5 text-[17px] leading-[1.35] ${
            resting ? "text-muted" : "text-ember"
          }`}
        >
          {item.oneLiner}
        </p>
      </div>

      {/* Price sits against the right margin on every screen. A resting item
          says nothing here, because its tag already has. */}
      <div className="justify-self-end text-right md:order-last">
        {item.price ? (
          <span className="t-item tabular-nums text-chalk">${item.price}</span>
        ) : resting ? null : (
          <span className="t-label whitespace-nowrap text-muted-strong">Ask</span>
        )}
      </div>

      <div className="col-span-2 col-start-2 mt-3 md:col-span-1 md:col-start-3 md:mt-1.5">
        <p className={`text-[15px] leading-[1.55] ${resting ? "text-muted" : "text-chalk"}`}>
          {item.whatsInIt}
        </p>
      </div>
    </li>
  );
}
