import Link from 'next/link';

/**
 * Wayfinding above an inner page's h1: where this page sits, one link per
 * level, the current page last and unlinked. Replaces the mono kicker these
 * pages used to carry — the same words, doing a job instead of decorating.
 *
 * `trail` is [{ label, href? }]; Home is prepended.
 */
export default function Crumbs({ trail }) {
  const items = [{ label: 'Home', href: '/' }, ...trail];
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label}>
              {last || !c.href ? (
                <span aria-current={last ? 'page' : undefined}>{c.label}</span>
              ) : (
                <Link href={c.href}>{c.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
