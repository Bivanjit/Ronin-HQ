import Image from 'next/image';
import Link from 'next/link';
import { ARTWORK } from '@/lib/artwork';
import { FeaturedSignals } from '@/components/home/FeaturedSignals';

const WORKFLOW_STEPS = [
  'Scan',
  'Discover',
  'Qualify',
  'Understand',
  'Verify',
  'Predict',
  'Record',
  'Track',
  'Resolve',
  'Evaluate',
  'Learn',
  'Adapt',
] as const;

const ROUTES = [
  { title: 'Terminal', path: '/terminal', desc: 'Live signal ledger with market regime context, filters, and full evidence on every signal.' },
  { title: 'Predictions', path: '/predictions', desc: 'Receipt-ledger of every prediction: evidence, invalidation conditions, and outcomes.' },
  { title: 'Wallets', path: '/wallets', desc: 'Behavioral wallet intelligence with relationship clusters and cohort analysis.' },
  { title: 'Rankings', path: '/rankings', desc: 'Observation-based boards across assets, models, and tracking wallets.' },
  { title: 'Research', path: '/research', desc: 'The operating system behind the intelligence — methodology and evidence chain.' },
  { title: 'Access', path: '/access', desc: 'Tiered research access with full feature breakdowns.' },
] as const;

const PHILOSOPHY = [
  { text: 'Data Over', strong: 'Hype' },
  { text: 'Evidence Over', strong: 'Promises' },
  { text: 'No', strong: 'Fabricated Signals' },
  { text: 'Every Prediction Leaves a', strong: 'Receipt' },
] as const;

export default function HomePage() {
  const hero = ARTWORK['hero-gold-features'];
  const workflowBg = ARTWORK['hero-red-wide'];

  return (
    <div className="page-root">
      {/* Hero */}
      <section className="hero section" aria-labelledby="hero-title" style={{ borderRadius: 'var(--radius-xl)' }}>
        <div className="hero__media" style={{ position: 'relative' }}>
          <Image
            className="hero__image"
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__inner">
          <p className="hero__eyebrow">Mind over market</p>
          <h1 id="hero-title" className="hero__title">
            RONIN <span className="accent">影</span>
          </h1>
          <p className="hero__subtitle">Predictive On-Chain Intelligence</p>
          <p className="hero__tagline">See what the noise hides.</p>
        </div>
        <div className="hero__illustrative">
          <span className="label text-gold">ILLUSTRATIVE DATA</span>
        </div>
      </section>

      {/* Philosophy bar */}
      <section className="philosophy-bar section" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {PHILOSOPHY.map((item) => (
          <div key={item.strong} className="philosophy-item">
            {item.text} <strong>{item.strong}</strong>
          </div>
        ))}
      </section>

      {/* Intelligence Workflow */}
      <section
        className="workflow section"
        aria-labelledby="workflow-title"
        style={{ borderRadius: 'var(--radius-xl)' }}
      >
        <div className="workflow__bg" aria-hidden="true" style={{ position: 'relative' }}>
          <Image
            className="workflow__bgImage"
            src={workflowBg.src}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="workflow__inner">
          <div className="section-header-row">
            <div>
              <p className="section-kicker">Intelligence Workflow</p>
              <h2 id="workflow-title" className="display-md">
                The Operating System
              </h2>
            </div>
            <p className="body-sm text-secondary" style={{ maxWidth: 420 }}>
              Every signal moves through the same disciplined pipeline. Nothing
              is emitted until every gate verifies the evidence.
            </p>
          </div>

          <ol className="flow-steps">
            {WORKFLOW_STEPS.map((step, index) => (
              <li key={step} className="flow-step" style={{ listStyle: 'none' }}>
                {index > 0 && (
                  <span className="flow-arrow" aria-hidden="true">
                    →
                  </span>
                )}
                <span className="flow-step__num">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured Intelligence Demo */}
      <section className="page-section" aria-labelledby="demo-title">
        <div className="section-header-row">
          <div>
            <p className="section-kicker">Featured Intelligence Demo</p>
            <h2 id="demo-title" className="display-md">
              Signals Behind the Curtain
            </h2>
            <p className="body-sm text-secondary" style={{ marginTop: 'var(--space-2)' }}>
              Select a signal card to reveal its summary evidence. Three of many
              illustrative signals tracked by the terminal.
            </p>
          </div>
          <span className="label text-gold">ILLUSTRATIVE DATA</span>
        </div>
        <FeaturedSignals />
      </section>

      {/* Route entry grid */}
      <section className="page-section" aria-labelledby="routes-title">
        <div className="section-header-row">
          <div>
            <p className="section-kicker">Explore</p>
            <h2 id="routes-title" className="display-md">
              Enter the Interface
            </h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3">
          {ROUTES.map((route, index) => (
            <Link key={route.path} href={route.path} className="card route-card card-interactive">
              <span className="route-card__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="route-card__title">{route.title}</span>
              <span className="route-card__desc">{route.desc}</span>
              <span className="route-card__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}