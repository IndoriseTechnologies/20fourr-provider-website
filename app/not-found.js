import Link from 'next/link';
import { ArrowRight } from '@/components/Icons';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

/* Replaces Next's unstyled default 404, which rendered white on a site
   whose ground is ink everywhere else. */
export default function NotFound() {
  return (
    <header className="hero hero--list notfound">
      <div className="hero__glow" />
      <div className="wrap stack g-28">
        <h1>This page could not be found.</h1>
        <p className="lede">
          The link may be out of date. Everything else is one step away.
        </p>
        <div className="row-ctas">
          <Link className="btn btn--primary" href="/security-providers">
            Browse verified providers <ArrowRight />
          </Link>
          <Link className="btn btn--ghost" href="/">
            Back to home
          </Link>
        </div>
      </div>
    </header>
  );
}
