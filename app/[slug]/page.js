import Link from 'next/link';
import { notFound } from 'next/navigation';
import Crumbs from '@/components/Crumbs';
import JsonLd from '@/components/JsonLd';
import SampleNotice from '@/components/SampleNotice';
import { ArrowRight } from '@/components/Icons';
import ProviderCard from '../security-providers/ProviderCard';
import { listingJsonLd } from '../security-providers/schema';
import {
  CATEGORY_PLURAL,
  CATEGORY_REQUIREMENT,
  comboPages,
  findCombo,
  inr,
  LISTINGS_ARE_SAMPLE,
  lowestRate,
  PAGE_SIZE,
  queryProviders,
} from '../security-providers/data';

/**
 * City × service landing pages — /security-guards-in-mumbai, /bouncers-in-delhi …
 *
 * These are the searches people actually type, so each gets a real URL instead
 * of a query string. Only combinations that clear MIN_PROVIDERS_FOR_LISTING are
 * built; anything else 404s rather than rendering a thin page (dynamicParams).
 *
 * While the directory is sample data these pages are noindex and stay out of
 * the sitemap: a search landing page listing people who do not exist is the
 * one thing this site cannot put in front of Google. Flipping
 * LISTINGS_ARE_SAMPLE in data.js publishes all of them at once.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return comboPages().map(({ slug }) => ({ slug }));
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const combo = findCombo(slug);
  if (!combo) return { title: 'Not found' };
  const { category, city } = combo;
  const what = CATEGORY_PLURAL[category];
  const { providers, total } = queryProviders({ category, city });
  const from = inr(lowestRate(providers));

  return {
    title: `${cap(what)} in ${city} — PSARA-verified`,
    description: `Hire PSARA-verified ${what} in ${city}. ${total} providers, day rates from ${from}. Compare verification badges and price a specific date range — no account, no phone number, no sales call.`,
    alternates: { canonical: `/${slug}` },
    robots: LISTINGS_ARE_SAMPLE ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${cap(what)} in ${city} | 20fourr`,
      description: `PSARA-licensed, identity-checked ${what} in ${city}. Compare day rates.`,
    },
  };
}

export default async function ComboPage({ params }) {
  const { slug } = await params;
  const combo = findCombo(slug);
  if (!combo) notFound();

  const { category, city } = combo;
  const what = CATEGORY_PLURAL[category];
  const all = queryProviders({ category, city, page: 1 });
  const from = inr(lowestRate(all.providers));
  const directoryHref = `/security-providers?category=${category}&city=${encodeURIComponent(city)}`;

  const sameCity = comboPages().filter((c) => c.city === city && c.category !== category);
  const sameService = comboPages().filter((c) => c.category === category && c.city !== city);

  return (
    <>
      <JsonLd
        data={listingJsonLd({
          providers: all.providers,
          category,
          city,
          page: 1,
          pageSize: PAGE_SIZE,
          canonical: `/${slug}`,
        })}
      />

      <header className="hero hero--list" id="top">
        <div className="hero__glow" />
        <div className="wrap stack g-20">
          <Crumbs
            trail={[
              { label: 'Providers', href: '/security-providers' },
              { label: `${cap(what)} in ${city}` },
            ]}
          />
          <h1>
            <em>{cap(what)}</em> in {city}
          </h1>
          <p className="lede">
            Every provider listed here has had their identity and PSARA licence checked by our
            compliance team before appearing. Compare day rates and price a specific date range
            &mdash; no account, no phone number, no sales call.
          </p>
          <ul className="facts" aria-label={`${cap(what)} in ${city} at a glance`}>
            <li>
              <span className="label">Providers</span>
              <b className="num">{all.total}</b>
            </li>
            <li>
              <span className="label">Day rates from</span>
              <b className="num">{from}</b>
            </li>
            <li>
              <span className="label">Checked before listing</span>
              <b>{CATEGORY_REQUIREMENT[category]}</b>
            </li>
          </ul>
        </div>
      </header>

      <section className="band band--ink-2" id="providers-list">
        <div className="wrap">
          {LISTINGS_ARE_SAMPLE && <SampleNotice />}
          <div className="pgrid">
            {all.providers.map((p) => (
              <ProviderCard key={p.id} provider={p} selectedCity={city} />
            ))}
          </div>
          <p className="combo__more">
            <Link className="text-link" href={directoryHref}>
              Filter and sort {what} in {city} in the full directory <ArrowRight />
            </Link>
          </p>
        </div>
      </section>

      {(sameCity.length > 0 || sameService.length > 0) && (
        <section className="band">
          <div className="wrap directory">
            {sameCity.length > 0 && (
              <div className="directory__col">
                <h2 className="h-d3">Other services in {city}</h2>
                <ul className="city-links">
                  {sameCity.map((c) => (
                    <li key={c.slug}>
                      <Link className="city-link" href={`/${c.slug}`}>
                        <span>{cap(CATEGORY_PLURAL[c.category])} in {city}</span>
                        <ArrowRight />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sameService.length > 0 && (
              <div className="directory__col">
                <h2 className="h-d3">{cap(what)} in other cities</h2>
                <ul className="city-links">
                  {sameService.map((c) => (
                    <li key={c.slug}>
                      <Link className="city-link" href={`/${c.slug}`}>
                        <span>{cap(what)} in {c.city}</span>
                        <ArrowRight />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
