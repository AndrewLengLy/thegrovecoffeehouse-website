import { site, hours } from "@/lib/site";

/** Absolute URL for a site path. */
export const absolute = (path = "") => `${site.url}${path}`;

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
