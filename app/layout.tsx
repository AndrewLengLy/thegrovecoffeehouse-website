import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono, Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ConversionEvents } from "@/components/ConversionEvents";
import { JsonLd } from "@/components/JsonLd";
import { absolute, businessNode, openingHours } from "@/lib/seo";
import { menu } from "@/lib/menu";

/* A condensed signage face, a warm grotesque, and a mono. All three are self
   hosted by next/font and subset to latin, so there is no third party request
   and no layout shift when they land.

   Big Shoulders was drawn for public signage, which is exactly the register
   this shop wants: painted, condensed, set large. Work Sans carries the
   reading copy without the flatness of the usual default. IBM Plex Mono is the
   texture of this build: every label, caption, price and button sits in it, so
   the small type reads as typed and pinned up rather than set. It is loaded at
   two weights only, because that is all the design uses. */
const shoulders = Big_Shoulders({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shoulders",
});

const work = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
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
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1f1e1b",
  colorScheme: "dark",
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
      className={`${shoulders.variable} ${work.variable} ${plexMono.variable}`}
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
      <body>
        <a href="#main" className="sr-only skip-link">
          Skip to content
        </a>
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
