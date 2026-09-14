/**
 * Things that happen at The Grove.
 *
 * Every entry here is taken from a post on the shop's own Instagram
 * (@thegrovecoffeehouse916), with the source linked, and the copy stays close to
 * what they wrote. Nothing is a standing schedule: the music night post ended
 * with "Would you like to see another music night?", so the honest framing is
 * "this is the kind of thing that happens here, the next one is posted first on
 * Instagram", not a calendar.
 *
 * TODO(andrew): ask the owners whether music night is becoming regular, and
 * whether they want upcoming events listed here ahead of Instagram.
 */

export type EventKind = "music" | "celebration" | "drop";

export type GroveEvent = {
  slug: string;
  title: string;
  kind: EventKind;
  /** ISO date. For a multi day event, the first day. */
  date: string;
  /** ISO date of the last day, for multi day events. */
  endDate?: string;
  time?: string;
  blurb: string;
  /** The Instagram post it came from. */
  source: string;
};

export const EVENT_KIND_LABEL: Record<EventKind, string> = {
  music: "Music night",
  celebration: "Celebration",
  drop: "In store",
};

export const events: GroveEvent[] = [
  {
    slug: "third-birthday-2026",
    title: "The Grove turns three",
    kind: "celebration",
    date: "2026-08-21",
    endDate: "2026-08-24",
    blurb:
      "Three years on Sierra College Blvd, marked with cake and two birthday drinks: a cookie butter latte with a raspberry surprise, and a blueberry vanilla matcha under strawberry frosting foam. Special drinks were 13 percent off all weekend.",
    source: "https://www.instagram.com/thegrovecoffeehouse916/p/DcRoqEOynZK/",
  },
  {
    slug: "music-night-2026-06",
    title: "Sounds of Music",
    kind: "music",
    date: "2026-06-26",
    time: "7:00 PM",
    blurb:
      "An evening of live performers in the room, with drink inspired candles on the counter. Afterwards the shop asked whether people wanted another one. The answer, judging by the comments, was yes.",
    source: "https://www.instagram.com/thegrovecoffeehouse916/reel/DaIxzMbIi8w/",
  },
  {
    slug: "candle-drop-2026-06",
    title: "Hand poured candles",
    kind: "drop",
    date: "2026-06-30",
    blurb:
      "Soy candles poured locally and scented after the drinks and sweets on the board. Sold at the counter while they last, and made to sit next to the cup they are named for.",
    source: "https://www.instagram.com/thegrovecoffeehouse916/p/DaOLE6_gbfn/",
  },
];

/** Newest first. */
export const recentEvents = [...events].sort((a, b) => (a.date < b.date ? 1 : -1));

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "21 Aug" or "21 to 24 Aug". Built by hand so the server and client agree. */
export function formatEventDate(e: GroveEvent): { day: string; month: string; year: string } {
  const [y, m, d] = e.date.split("-").map(Number);
  let day = String(d);
  if (e.endDate) {
    const [, em, ed] = e.endDate.split("-").map(Number);
    day = em === m ? `${d} to ${ed}` : `${d} ${MONTHS[m - 1]} to ${ed}`;
  }
  return { day, month: MONTHS[m - 1], year: String(y) };
}
