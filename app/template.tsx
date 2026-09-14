/**
 * Page transition. A template remounts on every navigation, so the incoming
 * page runs its entrance animation without any animation library and without
 * delaying the next page's content. Under reduced motion the same class
 * becomes a 150ms cross fade, handled in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
