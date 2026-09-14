import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Until NEXT_PUBLIC_SITE_URL names the client's real domain, this build is a
 * preview on vercel.app, and a preview must never become the indexed home of a
 * real business. So: nothing is crawlable until that variable is set. Once it
 * is, everything is open, and the AI crawlers are named explicitly so the
 * intent is unambiguous.
 */
export default function robots(): MetadataRoute.Robots {
  const live = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

  if (!live) {
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
