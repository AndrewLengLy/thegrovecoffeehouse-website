/**
 * The Grove's mark: a stem with one leaf either side.
 *
 * This is the site's own mark, the same geometry as public/icon-192.png and
 * icon-512.png, and it is what the marquee's hidden leaf and the empty
 * photograph slots have always drawn. It lived as four hand copied paths in
 * two components; this is that geometry with one owner, so the mark on the
 * fascia and the mark on the app icon cannot drift apart.
 *
 * It is NOT the client's logo. The real mark is a green brush script with a
 * coffee branch, and the only copies anyone has found are a 150px Instagram
 * avatar and a photograph of the framed board shot at an angle behind glass.
 * See site.logo: the moment a real file lands there, Wordmark renders it and
 * this goes back to being the secondary mark it was drawn to be.
 */

type Props = {
  className?: string;
  /** Stroke width of the stem, in the 24 unit viewBox. */
  weight?: number;
  /** An accessible name. Null when something adjacent already names it. */
  title?: string | null;
};

export function GroveMark({ className = "", weight = 1.9, title = null }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path
        d="M12 21.5V10.5"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        fill="none"
      />
      {/* Solid on both leaves so it reads as a plant rather than a tick. */}
      <g transform="translate(16.5 9.5) rotate(-38)">
        <path d="M-6 0Q0 -4.3 6 0Q0 4.3 -6 0Z" fill="currentColor" />
      </g>
      <g transform="translate(7.6 13.6) rotate(38)">
        <path d="M-5 0Q0 -3.6 5 0Q0 3.6 -5 0Z" fill="currentColor" />
      </g>
    </svg>
  );
}
