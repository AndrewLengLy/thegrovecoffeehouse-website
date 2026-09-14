import { serializeJsonLd } from "@/lib/seo";

/** One structured data block. Server rendered, escaped, nothing else. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
  );
}
