import { site, hours } from "@/lib/site";

/** Absolute URL for a site path. */
export const absolute = (path = "") => `${site.url}${path}`;

/**
 * Whether this build is the real home of the business, and may be indexed.
 *
 * NEXT_PUBLIC_SITE_URL used to answer this on its own, but it is really two
 * questions wearing one hat: what origin do absolute URLs use, and is this
 * origin the canonical one. A preview alias needs the first, because an
 * og:image has to be an absolute URL a crawler can actually fetch and a
 * relative one gets no preview at all. It must never get the second: a
 * vercel.app deploy becoming the indexed home of a real business is the exact
 * failure app/robots.ts was written to prevent.
 *
 * So the origin is whatever the variable says, and indexability is a separate
 * test on what that origin is. Set the variable to the client's domain and
 * this turns true on its own.
 */
export function isIndexable(): boolean {
  if (!process.env.NEXT_PUBLIC_SITE_URL) return false;
  try {
    const host = new URL(site.url).hostname;
    return !/(^|\.)vercel\.app$/i.test(host) && host !== "localhost";
  } catch {
    return false;
  }
}

/**
 * Serialise structured data for a <script type="application/ld+json">.
 * The "<" escape is the one thing that matters: without it a "</script>" inside
 * any string field would end the tag early.
 */
export const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

/** The business as a schema.org node, reused wherever something points at it. */
export function businessNode() {
  return {
    "@type": "CafeOrCoffeeShop",
    "@id": absolute("/#business"),
    name: site.name,
    url: site.url,
    telephone: site.phone.e164,
    image: absolute("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
  };
}

export function postalAddress() {
  return businessNode().address;
}

export function openingHours() {
  return hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  };
}
