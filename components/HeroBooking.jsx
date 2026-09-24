'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/Icons';

/**
 * The hero's one CTA, plus the city picker beside it.
 *
 * On phones the picker is replaced by a row of city links, so booking in a
 * city is one tap rather than three.
 *
 * Picking a city doesn't navigate on its own — it re-targets "Book verified
 * security" at the directory filtered to that city (`/security-providers?city=`,
 * which the directory already reads server-side). Leave it on "Choose your
 * city" and the button falls back to `#book`, same as before this existed.
 */
export default function HeroBooking({ cities, defaultHref = '#book' }) {
  const [city, setCity] = useState('');
  const selectId = useId();
  const href = city ? `/security-providers?city=${encodeURIComponent(city)}` : defaultHref;

  return (
    <div className="stack g-16">
      {/* One bar, two parts: the picker is an input, not a second action. */}
      <div className="bookbar">
        <label className="visually-hidden" htmlFor={selectId}>Choose your city</label>
        <select
          id={selectId}
          className="bookbar__city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Choose your city</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <Link className="btn btn--primary bookbar__go" href={href}>
          Book verified security <ArrowRight />
        </Link>
      </div>
      {/* Phones: one tap per city instead of open-picker, choose, then book.
          The bar above stays for "no city yet"; on wide screens the picker does
          this job and these are hidden (see .citychips). */}
      <nav className="citychips" aria-label="Book by city">
        <ul>
          {cities.map((c) => (
            <li key={c}>
              <Link href={`/security-providers?city=${encodeURIComponent(c)}`}>{c}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link className="hero__verify" href="#trust">See how we verify providers</Link>
    </div>
  );
}
