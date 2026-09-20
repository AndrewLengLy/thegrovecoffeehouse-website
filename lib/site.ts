/**
 * Single source of truth for The Grove Coffee House.
 *
 * Every address, phone number, and hours string on the site reads from here so
 * the business never appears with two different sets of details. Anything that
 * has not been confirmed with the owners is marked TODO and must be confirmed
 * before launch.
 */

export const site = {
  name: "The Grove Coffee House",
  shortName: "The Grove",

  /**
   * The public origin. Read from NEXT_PUBLIC_SITE_URL so the same build serves a
   * preview on vercel.app and the real domain once it exists. Until that
   * variable is set, robots.ts refuses indexing, so a .vercel.app URL can never
   * end up in Google as the canonical home of the business.
   *
   * TODO(andrew): set NEXT_PUBLIC_SITE_URL to the client's domain in Vercel.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://thegrovecoffeehouse.com",

  tagline: "A family owned coffee house in Roseville, California.",

  /**
   * The client's real logo.
   *
   * TODO(andrew): the mark exists. It is "The Grove Coffee House" set in a green
   * brush script with a coffee branch and beans, and it is on the framed board
   * inside the shop. What we do not have is a usable FILE. The only versions
   * findable online are a 150px Instagram avatar and a photograph of the framed
   * board taken at an angle behind glass, and neither is a production asset.
   *
   * Ask the client for, in order of preference:
   *   1. SVG, or the original Illustrator or EPS
   *   2. PNG on transparent background, at least 1200px wide
   *   3. Whatever their sign maker or printer still has on file
   * Ask for a reversed or single colour version too, for the dark footer.
   *
   * Fill these in and the wordmark swaps everywhere automatically. Until then
   * the site sets the name in its own signage face, which is honest: it does
   * not pretend to be a mark the business does not have on this site yet.
   */
  logo: {
    /** Path under /public, e.g. "/logo/the-grove.svg" */
    src: null as string | null,
    /** Reversed version for the ink and green fields. Falls back to src. */
    srcOnDark: null as string | null,
    /** Intrinsic size, needed by next/image. */
    width: 0,
    height: 0,
  },

  address: {
    street: "9260 Sierra College Blvd STE 100",
    city: "Roseville",
    region: "CA",
    regionName: "California",
    postalCode: "95661",
    country: "US",
  },

  // Formatted once, used everywhere.
  addressLine: "9260 Sierra College Blvd STE 100, Roseville, CA 95661",

  /**
   * TODO(andrew): confirm the name on the plaza signage and the best landmark to
   * navigate by, then put them here. Research found the parcel is recorded as a
   * shopping centre with a CVS Pharmacy at 9280 Sierra College Blvd next door,
   * but a plaza name that does not match the sign people actually see is worse
   * than no plaza name, so nothing is claimed until the owners confirm it.
   */
  plaza: null as string | null,

  phone: {
    display: "(916) 771-2221",
    href: "tel:+19167712221",
    e164: "+19167712221",
  },

  /**
   * The handle in the original brief, @thegrovecoffeehouse, is a different
   * business entirely: a free Wednesday morning coffee ministry at Holly Grove
   * Mennonite Church in Westover, Maryland. The Roseville cafe is the 916
   * account, whose bio carries this exact address. Verified 2026-09-05.
   */
  instagram: {
    handle: "@thegrovecoffeehouse916",
    url: "https://www.instagram.com/thegrovecoffeehouse916/",
  },

  /** Other pages that unambiguously mean this business. Feeds sameAs. */
  listings: {
    yelp: "https://www.yelp.com/biz/the-grove-coffee-house-roseville",
    joe: "https://joe.coffee/locations/ca/roseville/the-grove-coffee-house-roseville-d8b19266-c145-4532-ae39-66db2b8a7de1/",
  },

  roaster: {
    name: "Chocolate Fish Coffee Roasters",
    /* Verified by live fetch during the build. The apex domain is the site's own
       declared canonical, so no www. */
    url: "https://chocolatefishcoffee.com/",
    location: "Sacramento",
  },

  /**
   * Verified against the City of Roseville authoritative Address Point GIS layer,
   * which holds a record for "9260 SIERRA COLLEGE BL STE 100" at exactly this
   * point, and corroborated by a surveyed OpenStreetMap cafe node for The Grove
   * 5 metres away. The pin was also checked against the Census geographies API,
   * which returns Roseville city, Placer County, ZCTA 95661.
   *
   * Do NOT replace these by re-geocoding the address string. The Census
   * one-line geocoder returns a TIGER interpolated point on the road centreline
   * 135 metres east, which reverse geocodes to a different address entirely.
   */
  geo: { latitude: 38.730163, longitude: -121.227627 } as {
    latitude: number;
    longitude: number;
  } | null,

  /**
   * Google Maps Directions URL. Uses the documented Maps URL API with the plain
   * address, so it needs no API key and no place ID.
   */
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("9260 Sierra College Blvd STE 100, Roseville, CA 95661"),

  mapEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("9260 Sierra College Blvd STE 100, Roseville, CA 95661") +
    "&output=embed",
} as const;

/* ------------------------------------------------------------------ */
/* Hours                                                               */
/* ------------------------------------------------------------------ */

export type HoursRow = {
  /** Human label as it appears on the site. */
  label: string;
  /** Display time range. */
  time: string;
  /** Schema.org day names for openingHoursSpecification. */
  days: string[];
  opens: string;
  closes: string;
};

/**
 * TODO(andrew): SATURDAY IS IN CONFLICT. The brief and joe.coffee both say
 * Saturday 7:00 to 15:00. The shop's own Instagram bio (@thegrovecoffeehouse916)
 * says "Monday - Saturday 7am - 5pm, Sunday 7am - 3pm". Those two directory
 * sources likely both trace to Google, so they are not independent, and the
 * bio is owner written. Shipping the EARLIER close for Saturday until confirmed,
 * because sending somebody to a locked door at 4pm is the worse mistake.
 * Weekdays 7:00 to 17:00 and Sunday 7:00 to 15:00 are agreed by every source.
 */
export const hours: HoursRow[] = [
  {
    label: "Monday to Friday",
    time: "7:00 AM to 5:00 PM",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "17:00",
  },
  {
    label: "Saturday and Sunday",
    time: "7:00 AM to 3:00 PM",
    days: ["Saturday", "Sunday"],
    opens: "07:00",
    closes: "15:00",
  },
];

/** Stated plainly because the weekend difference is the thing people get wrong. */
export const hoursCaveat =
  "We close two hours earlier on the weekend than we do on weekdays. Holiday hours can change, so give us a call if you are coming on one.";

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/visit", label: "Visit" },
  { href: "/our-story", label: "Our story" },
] as const;

/* ------------------------------------------------------------------ */
/* Conversion events                                                   */
/* ------------------------------------------------------------------ */

/**
 * Stable, human readable event names. These feed the monthly Scoreboard, so
 * renaming one breaks the month over month comparison. Add, do not rename.
 */
export const events = {
  directionsClick: "directions_click",
  phoneClick: "phone_click",
  menuView: "menu_view",
  instagramClick: "instagram_click",
} as const;
