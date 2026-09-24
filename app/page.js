import Link from 'next/link';
import { CLIENT_APP_URL, PROVIDER_APP_URL } from '@/app/site';
import DutyTicket from '@/components/DutyTicket';
import AppPreview from '@/components/AppPreview';
import BookingSteps from '@/components/BookingSteps';
import DutySteps from '@/components/DutySteps';
import ProviderReel from '@/components/ProviderReel';
import HeroBooking from '@/components/HeroBooking';
import StickyBookBar from '@/components/StickyBookBar';
import HomeFaq from '@/components/HomeFaq';
import {
  LockIcon,
  BriefingIcon,
  ClockIcon,
  ScaleIcon,
  BadgeIcon,
  SirenIcon,
  DocStampIcon,
} from '@/components/TrustIcons';
import {
  AlertIcon,
  ArrowRight,
  CheckIcon,
  DocIcon,
  ShieldCheckIcon,
  ShieldEmptyIcon,
} from '@/components/Icons';

const SERVICE_INTENTS = [
  {
    title: 'Private security agency services',
    body: 'Compare PSARA-verified agencies for manned guarding, gate security, warehouse protection and regular site duty.',
    href: '/security-providers?category=guard',
    label: 'Browse security guards',
  },
  {
    title: 'Event security services',
    body: 'Book bouncers and event security personnel for weddings, concerts, clubs, corporate events and private functions.',
    href: '/security-providers?category=bouncer',
    label: 'Browse event security',
  },
  {
    title: 'Armed security and gunman services',
    body: 'Find providers whose firearm licence is checked separately from their PSARA credentials for eligible high-risk duties.',
    href: '/security-providers?category=gunman',
    label: 'Browse armed security',
  },
  {
    title: 'Executive protection',
    body: 'Arrange a personal security officer for close protection, travel, site visits and daily movement.',
    href: '/security-providers?category=pso',
    label: 'Browse personal security officers',
  },
];

// Every city here has to clear app/sitemap.js's MIN_PROVIDERS_FOR_LISTING
// gate — Jaipur used to be listed here but only has 2 primary-city providers,
// so the homepage was linking to a page the sitemap deliberately excludes as
// too thin to index. Kolkata has 3 and is already in the sitemap.
const COVERAGE_CITIES = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'];

const CREDENTIALS = [
  'PSARA-licensed providers only',
  'KYC verified before onboarding',
  'Address hidden until payment',
  'Threat brief released on assignment',
  'GST-compliant, itemised billing',
];

const SERVICES = [
  {
    code: 'GRD',
    name: 'Security guard',
    body: 'Static post and gate duty for buildings, sites, warehouses and offices. Available as a single shift or a standing weekly deployment.',
    req: 'PSARA licence · Govt ID · Live selfie',
  },
  {
    code: 'BNC',
    name: 'Bouncer',
    body: 'Crowd control and door management for clubs, concerts, weddings and large private functions.',
    req: 'PSARA licence · Govt ID · Live selfie',
  },
  {
    code: 'GUN',
    name: 'Armed gunman',
    body: 'Licensed armed protection for cash movement, industrial sites and elevated-risk premises.',
    req: 'Firearm licence verified per booking · PSARA',
  },
  {
    code: 'PSO',
    name: 'Personal security officer',
    body: 'Dedicated close protection and travel escort for individuals facing a named or credible threat.',
    req: 'Highest tier · PSARA re-checked per booking',
  },
];

/* The complete badge vocabulary — these seven are exactly BADGE_LABEL in
   security-providers/data.js, so a visitor who clicks through to the directory
   meets the same words on the provider chips. The eighth card is the absent
   badge: a list of things we check reads as a list of things every provider has
   unless the page says otherwise, and it does not.
   `m` is the provenance line — who did the checking and when, which is the part
   that makes a badge a claim about a document rather than about a person. */
const BADGES = [
  {
    k: 'Verified identity',
    b: <>Government photo ID checked against the person or entity applying, and approved by our compliance team.</>,
    m: <>Checked by <b>compliance team</b> &middot; at onboarding</>,
  },
  {
    k: 'Background verified',
    b: <>Police verification on file and read by an admin before the provider is allowed to appear in search results.</>,
    m: <>Checked by <b>admin review</b> &middot; before listing</>,
  },
  {
    k: 'PSARA verified',
    b: <>Holds a current licence under the Private Security Agencies (Regulation) Act, 2005, with expiry tracked on a rolling basis.</>,
    m: <>Checked by <b>compliance team</b> &middot; re-checked on expiry</>,
  },
  {
    k: 'Firearms authorised',
    b: <>Holds a valid individual weapon licence, verified separately from the agency licence. Required for any armed booking.</>,
    m: <>Checked <b>independently</b> &middot; per officer</>,
  },
  {
    k: 'Ex-serviceman',
    b: <>Discharge or retirement certificate from the armed forces or police on file and verified.</>,
    m: <>Checked by <b>compliance team</b> &middot; document-backed</>,
  },
  {
    k: 'Top rated',
    b: <>Averages 4.5 or higher across at least five completed bookings. It cannot be bought, and it is removed automatically if the average drops.</>,
    m: <>Computed from <b>client ratings</b> &middot; live</>,
  },
  {
    k: 'Elite protection',
    b: <>Our highest verification tier, reserved for close-protection specialists who clear every check above plus an assignment history review.</>,
    m: <>Highest tier &middot; <b>manual approval</b></>,
  },
  {
    k: 'No badge shown',
    b: <>If a badge is absent, that check has not been cleared. We show what has been verified rather than implying everything has.</>,
    m: <>Absence is <b>information</b>, not an oversight</>,
  },
];

// The compliance guarantees, run through the same log. "Verification" and
// "Disputes" used to be their own cards here — the first said nothing BADGES
// doesn't already prove, and the second said nothing ACCOUNTABILITY doesn't
// already own; both were cut rather than repeated. See ACCOUNTABILITY's
// "Evidence" entry for where the dispute-process specifics live now.
const TRUST = [
  {
    k: 'Contact privacy',
    h: 'Numbers stay hidden until you pay',
    b: <>A provider cannot see your address and you cannot see their number until the booking is paid. It keeps deals on the platform &mdash; which is what keeps the licence checks, the insurance trail and the dispute route intact.</>,
    Icon: LockIcon,
  },
  {
    k: 'Threat brief',
    h: 'They arrive knowing what they’re walking into',
    b: <>If you&rsquo;ve been threatened or attacked before, you record it once in your profile. It&rsquo;s released to the assigned provider <b>after payment only</b> &mdash; late enough to protect you, early enough for them to prepare.</>,
    Icon: BriefingIcon,
  },
  {
    k: 'Cancellation',
    h: 'Refunds on a published clock',
    b: <>Cancel more than 24 hours out and <b>90%</b> comes back to your wallet; between 12 and 24 hours, <b>50%</b>. Inside 12 hours, nothing &mdash; because by then the guard has already turned down other work.</>,
    Icon: ClockIcon,
  },
  {
    k: 'Ratings',
    h: 'Both directions',
    b: <>You rate the guard on professionalism, punctuality, communication and compliance, and they rate you too. Ratings follow the account, so repeat behaviour is visible before anyone accepts.</>,
    Icon: ScaleIcon,
  },
];

/* Escalation and statute, in the same card grid the provider perks use. The key
   is a mono tag rather than a figure here — these are named consequences, not
   amounts, and the column is short either way. */
const ACCOUNTABILITY = [
  ['Falsified', 'Falsified documents result in immediate and permanent removal from the platform.'],
  ['Delisting', 'Repeated no-shows or persistently poor ratings lead to delisting.'],
  [
    'Evidence',
    'Check-in and check-out are recorded against the shift you paid for. Raise a dispute and it becomes a tracked ticket with an assigned reviewer, the full chat record, and a resolution — refund, credit, replacement or penalty.',
  ],
  [
    'PSARA 2005',
    'The Private Security Agencies (Regulation) Act, 2005 governs who may lawfully supply private security personnel in India.',
  ],
  [
    'Pre-listing',
    '20fourr verifies each provider’s PSARA licence before listing them, and re-checks expiry on a rolling basis.',
  ],
  [
    'On lapse',
    'When a licence lapses, the provider is blocked from search and from accepting new bookings automatically — not at an admin’s discretion — until the renewed licence is verified.',
  ],
];

/* Title and description are inherited from the root layout; this exists so the
   home page states its own canonical like every other route does. Without it a
   crawler that arrives on a tracking-parameter variant has nothing telling it
   which URL is the real one. */
export const metadata = {
  title: 'Private Security Services in India | Verified Guards, Bouncers & PSOs',
  description:
    'Find PSARA-verified private security agency services in India: manned guarding, event security, armed security and executive protection. Compare providers and book online.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Private Security Services in India | 20fourr',
    description:
      'Compare PSARA-verified security guards, bouncers, armed security providers and personal security officers across India.',
  },
};

export default function HomePage() {
  return (
    <>
      {/* ---------- hero ----------
          Offer and booking control on the left, the proof object on the right.
          The credential strip sits on the fold line as the page's "logo bar":
          the five things true of every listing, stated once. */}
      <header className="hero" id="top">
        <div className="hero__bg" aria-hidden="true" />
        <div className="wrap hero__in">
          <div className="hero__copy">
            <h1>
              Private security services with <em>verified</em> guards, bouncers and armed personnel anywhere in India.
            </h1>
            <p className="hero__sub">
              Ten calls, four quotes, zero paperwork — that’s how security gets hired today. <b>20fourr</b> puts every provider licensed under <abbr title="Private Security Agencies (Regulation) Act, 2005">PSARA</abbr>, India’s law on who may supply private security, in one place, so you see the price upfront and book in minutes.
            </p>
            <HeroBooking cities={COVERAGE_CITIES} />
            <p className="hero__fine">For clients &middot; PSARA-licensed providers &middot; No cash at the gate &middot; Itemised tax invoice on every booking</p>
          </div>

          <div className="hero__proof">
            <DutyTicket />
          </div>
        </div>

        <div className="wrap">
          <ul className="creds" aria-label="True of every listing">
            {CREDENTIALS.map((c) => (
              <li className="cred" key={c}>
                <CheckIcon />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <StickyBookBar />

      {/* ---------- services ----------
          One section, not two. The four search-intent cards that used to open
          the page covered the same four categories as this grid; they now live
          in the browse directory near the foot of the page (#security-services),
          where they do their job as indexable links without delaying the
          visitor twice. */}
      <section className="band band--ink-2" id="services">
        <div className="wrap">
          <div className="sechead">
            <h2>Four categories. Each with its own bar to clear.</h2>
            <p className="lede">
              A gate guard and an armed PSO are not the same hire, so we don&rsquo;t verify them the
              same way. The heavier the responsibility, the more paperwork a provider has to satisfy
              before they appear in your search results.
            </p>
          </div>

          <div className="tiers4">
            {SERVICES.map((s, i) => (
              <article className="tier4" key={s.code} style={{ '--lvl': i + 1 }}>
                <h3>{s.name}</h3>
                <div className="tier4__top">
                  <span className="label">{s.code}</span>
                  {/* Four-step verification bar: the ordinal of the paperwork
                      each category has to clear, drawn rather than stated. */}
                  <span className="tier4__meter" aria-hidden="true">
                    {[1, 2, 3, 4].map((n) => (
                      <i key={n} className={n <= i + 1 ? 'is-on' : undefined} />
                    ))}
                  </span>
                </div>
                <p className="tier4__body">{s.body}</p>
                <p className="tier4__req">
                  <DocIcon />
                  <span>{s.req}</span>
                </p>
                <Link className="text-link tier4__link" href={SERVICE_INTENTS[i].href}>
                  {SERVICE_INTENTS[i].label} <ArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- how it works ----------
          The client app's own screens, one at a time: step list + stage on
          desktop, swipe carousel on mobile. */}
      <section className="band" id="app">
        <div className="wrap">
          <div className="sechead">
            <h2>Every screen between search and payment.</h2>
            <p className="lede">
              These are the client app&rsquo;s own screens, in the order you meet them. A booking
              is priced before it is placed, and it does not move past the two disclaimer
              screens until you have read and ticked both.
            </p>
          </div>

          <BookingSteps />
        </div>
      </section>

      {/* ---------- trust sequence, part 1: what's checked ---------- */}
      <section className="band band--ink-2" id="how">
        <div className="wrap">
          <div className="sechead">
            <h2>One booking, proven at every state.</h2>
            <p className="lede">
              Requesting and paying happen on the screens above. From there the duty runs on
              proof &mdash; a provider accepts it, a code opens and closes the shift, and both
              sides rate each other. Nothing skips a step, and nothing is marked done without
              a record.
            </p>
          </div>

          <DutySteps />
        </div>
      </section>

      <section className="band" id="trust">
        <div className="wrap split">
          <div className="split__aside split__aside--sticky">
            <h2>Badges are earned, never self-declared.</h2>
            <p className="lede">
              Every badge below is computed from documents a 20fourr admin has reviewed and
              approved. A provider cannot switch one on for themselves, and a badge disappears
              automatically the moment the underlying document expires or is revoked.
            </p>
          </div>

          <div className="badges">
            {BADGES.map((b, i) => {
              const absent = i === BADGES.length - 1;
              return (
                <article className={`bcard${absent ? ' bcard--absent' : ''}`} key={b.k}>
                  <span className="bcard__icon">{absent ? <ShieldEmptyIcon /> : <ShieldCheckIcon />}</span>
                  <h3 className="bcard__k">{b.k}</h3>
                  <p className="bcard__b">{b.b}</p>
                  <p className="bcard__m">{b.m}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="wrap">
          <div className="sechead sechead--sub">
            <h3 className="h-d3">The rules are in the software, not in a policy document.</h3>
            <p className="lede">
              A promise you have to enforce by hand is not a protection. These run on every
              single booking, whether or not anyone is watching.
            </p>
          </div>

          <div className="rules">
            {TRUST.map((t) => (
              <article className="rule" key={t.k}>
                <span className="rule__icon"><t.Icon /></span>
                <div className="rule__txt">
                  <h4>{t.h}</h4>
                  <p className="rule__b">{t.b}</p>
                  <span className="label rule__k">{t.k}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- trust sequence, part 2: what we don't promise ----------
          The page's one paper band, spent here on purpose: this is the
          content that most needs to be read slowly. */}
      <section className="band band--paper" id="limits">
        <div className="wrap">
          <div className="sechead">
            <h2>What verification does not mean.</h2>
            <p className="lede">
              Being straight about the limits is part of being trustworthy. Verification is a check
              on documents and history &mdash; it is not a guarantee of future conduct, and no
              platform can honestly claim otherwise.
            </p>
          </div>

          <div className="notice">
            <p className="notice__hd">
              <AlertIcon />
              <span>Read this before you book</span>
            </p>
            <div className="notice__cols">
              <div className="limit">
                <span className="limit__icon"><BadgeIcon /></span>
                <h3>20fourr is a technology platform</h3>
                <p>
                  The security services themselves are performed by independent, PSARA-licensed
                  agencies and their personnel, and responsibility for their conduct on duty sits
                  with them.
                </p>
                <span className="label limit__k">Who performs the duty</span>
              </div>
              <div className="limit">
                <span className="limit__icon"><SirenIcon /></span>
                <h3>We are not an emergency service</h3>
                <p>
                  In an emergency, contact the police on 112 first, then raise an incident on your
                  booking so the record, the agency and our compliance team stay aligned.
                </p>
                <span className="label limit__k">Emergencies</span>
              </div>
              <div className="limit">
                <span className="limit__icon"><DocStampIcon /></span>
                <h3>A document was checked on a date</h3>
                <p>
                  A verified badge does not predict behaviour. Ratings, check-in records and the
                  incident process exist precisely because paperwork alone is not enough.
                </p>
                <span className="label limit__k">What a badge proves</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- trust sequence, part 3: what happens if it's wrong ---------- */}
      <section className="band" id="report">
        <div className="wrap">
          <div className="sechead">
            <h2>If something is wrong, there is one route.</h2>
            <p className="lede">
              An officer who did not report, conduct you are unhappy with, or a document you believe
              is not genuine &mdash; raise it against the booking. It reaches our compliance team
              and the agency at the same time, with the booking record attached.
            </p>
          </div>

          <div className="ledger">
            <p className="ledger__hd label">Report a concern &middot; PSARA compliance</p>
            <dl className="ledger__rows">
              {ACCOUNTABILITY.map(([n, d]) => (
                <div className="ledger__row" key={n}>
                  <dt>{n}</dt>
                  <dd>{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- price moment ----------
          After the whole trust sequence, not before it: by here there is
          nothing left to prove, only a decision to make. */}
      <section className="band band--deep pricecta" id="price">
        <div className="pricecta__glow" aria-hidden="true" />
        <div className="wrap pricecta__in">
          <h2>
            Know the price. <em>Then decide.</em>
          </h2>
          <p className="lede">
            Compare ratings. Pick your agency or individuals. Set your dates. See just the price
            &mdash; in <b>seconds</b>.
          </p>
          <Link className="btn btn--primary btn--lg" href="/security-providers">
            Compare security agencies <ArrowRight />
          </Link>
        </div>
      </section>

      {/* ---------- browse directory ----------
          Search-intent and city links: the page's SEO hub, kept together at
          the foot so it serves search without interrupting the client's read. */}
      <section className="band" id="coverage">
        <div className="wrap">
          <div className="directory">
            <div className="directory__col anchor" id="security-services">
              <h2 className="h-d3">Find the right private security service for the job.</h2>
              <p className="directory__lede">
                From regular manned guarding to event security and executive protection, compare
                PSARA-verified providers by role, city, rate and verification status.
              </p>
              <ul className="dir-list">
                {SERVICE_INTENTS.map((service) => (
                  <li key={service.title}>
                    <Link className="dir-item" href={service.href}>
                      <span className="dir-item__t">
                        {service.title} <ArrowRight />
                      </span>
                      <span className="dir-item__b">{service.body}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="directory__col">
              <h2 className="h-d3">Browse verified security providers by city.</h2>
              <p className="directory__lede">
                Check live provider coverage in major Indian cities. Select a city to compare the
                security services currently available there.
              </p>
              <ul className="city-links">
                {COVERAGE_CITIES.map((city) => (
                  <li key={city}>
                    <Link className="city-link" href={`/security-providers?city=${encodeURIComponent(city)}`}>
                      <span>Security services in {city}</span>
                      <ArrowRight />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <HomeFaq />

      {/* ---------- provider aside ----------
          A subordinate aside for the supply side, not a peer section: a single
          panel inside a band, linking out to /join. */}
      <section className="band band--aside" id="providers">
        <div className="wrap">
          <div className="aside-panel">
            <div className="aside-panel__meta">
              <span className="label">For guards, bouncers and agencies</span>
              <span className="label">Hindi &amp; English &middot; WhatsApp support during onboarding</span>
            </div>
            <div className="aside-panel__body">
              <div className="stack g-20">
                <h2 className="h-d3">Get paid in two days. Not in ninety.</h2>
                <p className="lede">
                  Set your own rate, pick your own days, and get paid on a schedule you can actually plan
                  around. Joining is free &mdash; you clear KYC once and start taking work.
                </p>
                <div className="row-ctas">
                  <Link className="btn btn--outline" href="/join">
                    Join as a provider <ArrowRight />
                  </Link>
                  <Link className="text-link" href="/faqs#for-providers">
                    Questions from agencies <ArrowRight />
                  </Link>
                </div>
              </div>
              <ProviderReel />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- final cta ----------
          One button: this closes the client funnel. The provider path steps
          down to the fine print. */}
      <section className="band band--ink-2" id="book">
        <div className="wrap">
          <div className="closer">
            <div className="closer__glow" aria-hidden="true" />
            <div className="closer__copy">
              <h2>Put a verified guard on your gate this week.</h2>
              <p className="lede">
                Open the app in your browser, tell us what you need, and we&rsquo;ll match you with
                licensed providers in your city. You approve the provider, you pay in the app, and
                you issue the code that starts the duty.
              </p>
              <div className="row-ctas">
                <a
                  className="btn btn--primary btn--lg"
                  href={CLIENT_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the client app <ArrowRight />
                </a>
              </div>
              <p className="closer__fine">
                Runs in any phone browser &mdash; the iPhone and Android apps are in store review.
                <br />
                Are you a guard or an agency?{' '}
                <Link href="/join">Join as a provider</Link>
                {' '}&middot;{' '}
                <a href={PROVIDER_APP_URL} target="_blank" rel="noopener noreferrer">
                  Open the provider app
                </a>
              </p>
            </div>

            <AppPreview />
          </div>
        </div>
      </section>
    </>
  );
}
