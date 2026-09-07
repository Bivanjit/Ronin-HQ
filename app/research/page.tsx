import Image from 'next/image';
import { ARTWORK } from '@/lib/artwork';
import { RESEARCH_BRIEFS } from '@/lib/demo-data';
import { StatusPill } from '@/components/ui/StatusPill';

const OS_CYCLE = [
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

export default function ResearchPage() {
  const mark = ARTWORK['ronin-intelligence-mark'];

  return (
    <div className="page-root">
      {/* Header */}
      <div className="research-hero" style={{ position: 'relative' }}>
        <Image
          src={mark.src}
          alt={mark.alt}
          fill
          priority
          sizes="(max-width: 1240px) 100vw, 1200px"
          style={{ objectFit: 'cover' }}
        />
        <div className="research-hero__overlay" aria-hidden="true" />
        <div className="research-hero__inner">
          <h1 className="display-lg">Research Methodology</h1>
          <p className="body-lg text-secondary" style={{ maxWidth: 640 }}>
            The discipline behind the intelligence. RONIN HQ is an
            observational research framework — not a trading signal service.
            Every step in the pipeline is designed to leave an auditable
            receipt.
          </p>
          <span className="label text-gold" style={{ display: 'inline-block', marginTop: 'var(--space-4)' }}>
            Demonstration Data
          </span>
        </div>
      </div>

      {/* Core Philosophy */}
      <section className="page-section" aria-labelledby="philosophy-title">
        <h2 id="philosophy-title" className="heading-lg text-gold">
          Core Philosophy
        </h2>
        <p className="body-md text-secondary" style={{ maxWidth: 760 }}>
          On-chain data is a record of what already happened. RONIN HQ treats
          it as raw material for disciplined inference — never as narrative.
          The core philosophy is encoded in four commitments:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ marginTop: 'var(--space-6)' }}>
          <div className="card">
            <h3 className="heading-sm">Data over hype</h3>
            <p className="card-body">
              Aggregated on-chain metrics take precedence over sentiment and
              narrative. Claims travel only as far as their evidence supports
              them.
            </p>
          </div>
          <div className="card">
            <h3 className="heading-sm">Evidence over promises</h3>
            <p className="card-body">
              Every conclusion is anchored to a specific, falsifiable chain of
              observations that any analyst can re-derive from source data.
            </p>
          </div>
          <div className="card">
            <h3 className="heading-sm">No fabricated signals</h3>
            <p className="card-body">
              If the evidence does not clear the threshold, no signal is
              produced. A quiet ledger is a healthy ledger — the system can
              and does decline to predict.
            </p>
          </div>
          <div className="card">
            <h3 className="heading-sm">Every prediction leaves a receipt</h3>
            <p className="card-body">
              Predictions are timestamped, versioned, and paired with
              invalidation conditions, so outcomes are judged against the
              original thesis — not against hindsight.
            </p>
          </div>
        </div>
      </section>

      {/* Operating System */}
      <section className="page-section" aria-labelledby="os-title">
        <h2 id="os-title" className="heading-lg text-gold">
          Operating System
        </h2>
        <p className="body-md text-secondary" style={{ maxWidth: 760 }}>
          From raw chain data to a recorded prediction, twelve gates — none of
          them optional:
        </p>
        <div className="card" style={{ marginTop: 'var(--space-6)' }}>
          <ol
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            style={{ paddingLeft: 0 }}
          >
            {OS_CYCLE.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-3"
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <span className="mono text-gold" style={{ width: 26 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="body-sm">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Evidence Chain */}
      <section className="page-section" aria-labelledby="chain-title">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ alignItems: 'start' }}>
          <div>
            <h2 id="chain-title" className="heading-lg text-gold">
              Evidence Chain
            </h2>
            <p className="body-md text-secondary">
              Each signal is a chain, not a verdict. The chain always runs from
              observation to inference to prediction:
            </p>
            <ol
              className="guideline-list check-list"
              style={{ marginTop: 'var(--space-4)' }}
            >
              <li>
                <strong>Observation</strong> — a measurable on-chain event
                (wallet movement, liquidity shift, exchange flow).
              </li>
              <li>
                <strong>Corroboration</strong> — the observation must align
                with at least one independent model signal.
              </li>
              <li>
                <strong>Qualification</strong> — graded strength and a risk
                score are assigned before anything is emitted.
              </li>
              <li>
                <strong>Receipt</strong> — the prediction, its invalidation
                conditions, and model versions are all recorded.
              </li>
              <li>
                <strong>Resolution</strong> — every prediction is resolved,
                evaluated, and fed back into model calibration.
              </li>
            </ol>
          </div>

          {/* Model Agreement as Information */}
          <div>
            <h2 id="agreement-title" className="heading-lg text-gold">
              Model Agreement as Information
            </h2>
            <p className="body-md text-secondary">
              Agreement between independent models is treated as information
              density, not as consensus comfort. When models that share no
              inputs converge, the evidence is structurally stronger. When
              they diverge, the disagreement itself is logged as data — it
              often precedes a regime transition.
            </p>
            <dl className="detail-grid" style={{ marginTop: 'var(--space-4)' }}>
              <div>
                <dt className="detail-item__label">Read</dt>
                <dd className="detail-item__value">
                  Agreement above 90% narrows the risk envelope but must not
                  inflate confidence.
                </dd>
              </div>
              <div>
                <dt className="detail-item__label">Dissonance</dt>
                <dd className="detail-item__value">
                  Disagreement below 60% downgrades a signal or suppresses it
                  entirely.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Risk Framework */}
      <section className="page-section" aria-labelledby="risk-title">
        <h2 id="risk-title" className="heading-lg text-gold">
          Risk Framework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 'var(--space-6)' }}>
          <div className="card safety-card">
            <h3 className="heading-sm">Maximum Favorable Excursion</h3>
            <p className="card-body">
              Expected MFE models the best-case path the prediction tolerates
              before invalidation. It is the upside envelope, not a target.
            </p>
          </div>
          <div className="card safety-card">
            <h3 className="heading-sm">Maximum Adverse Excursion</h3>
            <p className="card-body">
              Expected MAE bounds the worst adverse path consistent with the
              thesis still being valid. Breaches trigger invalidation review.
            </p>
          </div>
          <div className="card safety-card">
            <h3 className="heading-sm">Invalidation Over Target</h3>
            <p className="card-body">
              A prediction is judged against its invalidation conditions first.
              If the thesis is broken, the prediction is resolved — regardless
              of current price narrative.
            </p>
          </div>
        </div>
      </section>

      {/* Research briefs */}
      <section className="page-section" aria-labelledby="briefs-title">
        <div className="section-header-row">
          <div>
            <p className="section-kicker">Briefs</p>
            <h2 id="briefs-title" className="display-md">
              Current Research
            </h2>
          </div>
          <span className="label text-gold">Demonstration Data</span>
        </div>

        <div className="brief-cards">
          {RESEARCH_BRIEFS.map((brief) => (
            <article key={brief.id} className="card brief-card">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <StatusPill variant="gold">{brief.category}</StatusPill>
                <span className="mono caption text-muted">{brief.id}</span>
              </div>
              <h3 className="heading-sm" style={{ marginTop: 'var(--space-3)' }}>
                {brief.title}
              </h3>
              <p className="card-body">{brief.summary}</p>
              <div className="brief-card__findings">
                <h4>Key findings</h4>
                <ul className="guideline-list check-list" style={{ padding: 0 }}>
                  {brief.keyFindings.map((finding) => (
                    <li key={finding}>{finding}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="notice-banner" role="note">
        <p className="body-sm">
          <strong>Disclaimer:</strong> This is an illustrative research
          interface, not financial advice. All data is synthetic, fabricated
          for demonstration, and does not represent live market conditions or
          guaranteed outcomes.
        </p>
      </div>
    </div>
  );
}