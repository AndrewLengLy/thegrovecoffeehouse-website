import type { Metadata, Viewport } from "next";
import { Courier_Prime, EB_Garamond, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import { site } from "@/lib/site";
import { Announcement } from "@/components/sections/Announcement";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ConversionEvents } from "@/components/ConversionEvents";
import { JsonLd } from "@/components/JsonLd";
import { absolute, businessNode, isIndexable, openingHours } from "@/lib/seo";
import { menu } from "@/lib/menu";

/* An old style serif, a typewriter mono, and a plain grotesque. All three are
   self hosted by next/font and subset to latin, so there is no third party
   request and no layout shift when they land.

   EB Garamond stands in for the Caslon the reference is set in: an old style
   face whose italic carries every title on the site and whose roman carries
   the reading copy. Courier Prime is the typewriter, for prices, buttons and
   navigation. Hanken Grotesk sets item names and labels in small capitals. */
const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-garamond",
});

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-courier",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "The Grove Coffee House | Coffee and Food in Roseville, CA",
    template: "%s | The Grove Coffee House",
  },
  description:
    "Family owned coffee house on Sierra College Blvd in Roseville. Seasonal drinks, real food, outlets and room to stay. Beans from Chocolate Fish Coffee Roasters.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: site.url,
    title: "The Grove Coffee House | Coffee and Food in Roseville, CA",
    description:
      "Family owned coffee house on Sierra College Blvd in Roseville. Seasonal drinks, real food, and a room built for staying a while.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Grove Coffee House",
    description:
      "Family owned coffee house on Sierra College Blvd in Roseville. Seasonal drinks, real food, and a room built for staying a while.",
  },
  /* Agrees with app/robots.ts rather than contradicting it: a preview that
     disallows everything in robots.txt while its pages say "index, follow" is
     telling a crawler two different things. */
  robots: isIndexable() ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f2ecd9",
  colorScheme: "light",
};

/** LocalBusiness with the CafeOrCoffeeShop subtype, plus the WebSite node.
    Google and the answer engines read this directly, so nothing goes in that
    has not been confirmed. */
function structuredData() {
  const priced = menu.map((i) => (i.price ? Number(i.price) : NaN)).filter((n) => !Number.isNaN(n));
  const lo = Math.floor(Math.min(...priced));
  const hi = Math.ceil(Math.max(...priced));

  const business: Record<string, unknown> = {
    "@context": "https://schema.org",
    ...businessNode(),
    openingHoursSpecification: openingHours(),
    servesCuisine: ["Coffee", "Breakfast", "Sandwiches"],
    priceRange: `$${lo} to $${hi}`,
    hasMenu: absolute("/menu"),
    sameAs: [site.instagram.url, site.listings.yelp, site.listings.joe],
  };

  if (site.geo) {
    business.geo = {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    };
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absolute("/#website"),
    url: site.url,
    name: site.name,
    publisher: { "@id": absolute("/#business") },
  };

  return [business, website];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning is needed on <html> only: the inline script
       below adds a class to documentElement before React hydrates, which is the
       whole point of it, and React would otherwise flag the difference. */
    <html
      lang="en"
      className={`${garamond.variable} ${courier.variable} ${hanken.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks the document before first paint so initial hidden states only
            ever apply when JavaScript is actually running. With JavaScript off,
            the class never lands and every section renders normally. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-motion')",
          }}
        />
        {structuredData().map((d, i) => (
          <JsonLd key={i} data={d} />
        ))}
      </head>
      <body className="paper">
        <a href="#main" className="sr-only skip-link">
          Skip to content
        </a>
        <Announcement />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <ConversionEvents />
        <Analytics />
      </body>
    </html>
  );
}
