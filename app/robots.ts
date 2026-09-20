import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { isIndexable } from "@/lib/seo";

/**
 * Until NEXT_PUBLIC_SITE_URL names the client's REAL domain, this build is a
 * preview, and a preview must never become the indexed home of a real
 * business. Nothing is crawlable until then. Once it is, everything is open,
 * and the AI crawlers are named explicitly so the intent is unambiguous.
 *
 * Note the test is isIndexable(), not the variable being set: the variable is
 * also what gives a preview alias working absolute URLs for link previews, so
 * pointing it at a vercel.app host must not open the doors. See lib/seo.ts.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "PerplexityBot",
    "Google-Extended",
    "Applebot",
    "CCBot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
