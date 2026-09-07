'use client';

import { useMemo, useState } from 'react';
import { PREDICTIONS, type PredictionReceipt, type PredictionOutcome } from '@/lib/demo-data';
import { StatusPill } from '@/components/ui/StatusPill';
import {
  directionToVariant,
  deriveGrade,
  formatDateTime,
  formatPercent,
  outcomeToVariant,
  riskToVariant,
} from '@/lib/pill-variants';
import { useToast } from '@/lib/toast';

type OutcomeFilter = 'ALL' | PredictionOutcome;
type AssetFilter = 'ALL' | string;
type DirectionFilter = 'ALL' | string;

const OUTCOME_OPTIONS: readonly OutcomeFilter[] = [
  'ALL',
  'ACTIVE',
  'SIGNAL EXPIRED',
  'NO VALID PREDICTION',
];

export default function PredictionsPage() {
  const { addToast } = useToast();

  const [outcomeFilter, setOutcomeFilter] = useState<OutcomeFilter>('ALL');
  const [assetFilter, setAssetFilter] = useState<AssetFilter>('ALL');
  const [directionFilter, setDirectionFilter] = useState<DirectionFilter>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const uniqueAssets = useMemo(() => {
    const set = new Set(PREDICTIONS.map((p) => p.asset));
    return ['ALL', ...Array.from(set)];
  }, []);

  const uniqueDirections = useMemo(() => {
    const set = new Set(PREDICTIONS.map((p) => p.direction));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return PREDICTIONS.filter((p) => {
      if (outcomeFilter !== 'ALL' && p.outcome !== outcomeFilter) return false;
      if (assetFilter !== 'ALL' && p.asset !== assetFilter) return false;
      if (directionFilter !== 'ALL' && p.direction !== directionFilter) return false;
      return true;
    });
  }, [outcomeFilter, assetFilter, directionFilter]);

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  function handleExpand(p: PredictionReceipt) {
    toggleExpand(p.id);
    addToast(
      p.outcome === 'NO VALID PREDICTION'
        ? `${p.id}: No valid prediction — illustrative receipt`
        : `${p.id}: ${p.asset} ${p.outcome}`,
      'info',
    );
  }

  const overview = useMemo(() => {
    const active = PREDICTIONS.filter((p) => p.outcome === 'ACTIVE').length;
    const expired = PREDICTIONS.filter((p) => p.outcome === 'SIGNAL EXPIRED').length;
    const noValid = PREDICTIONS.filter((p) => p.outcome === 'NO VALID PREDICTION').length;
    return { total: PREDICTIONS.length, active, expired, noValid };
  }, []);

  return (
    <div className="page-root">
      {/* Header */}
      <div className="section-header-row">
        <div>
          <p className="section-kicker">Prediction Ledger</p>
          <h1 className="display-md">Prediction Receipts</h1>
          <p className="body-sm text-secondary">
            Every prediction carries a receipt: evidence, invalidation conditions,
            model versions, and outcomes. All data is illustrative.
          </p>
        </div>
        <span className="label text-gold">ILLUSTRATIVE DATA</span>
      </div>

      {/* Overview stats */}
      <div className="overview-grid" style={{ marginBottom: 'var(--space-8)' }}>
        <div className="stat-card">
          <span className="stat-label">Total Predictions</span>
          <span className="stat-value">{overview.total}</span>
          <span className="caption">In illustrative ledger</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active</span>
          <span className="stat-value" style={{ color: 'var(--cyan)' }}>
            {overview.active}
          </span>
          <span className="caption">Open prediction window</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Expired</span>
          <span className="stat-value" style={{ color: 'var(--text-muted)' }}>
            {overview.expired}
          </span>
          <span className="caption">Window closed, awaiting resolution</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">No Valid Prediction</span>
          <span className="stat-value" style={{ color: 'var(--vermilion)' }}>
            {overview.noValid}
          </span>
          <span className="caption">Below confidence threshold</span>
        </div>
      </div>

      {/* Filter bar */}
      <section aria-label="Filters" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="label">Outcome</span>
            {OUTCOME_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`chip chip--${outcomeFilter === opt ? 'active' : 'idle'}`}
                aria-pressed={outcomeFilter === opt}
                onClick={() => setOutcomeFilter(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="label">Asset</span>
            <select
              className="chip"
              value={assetFilter}
              onChange={(e) => setAssetFilter(e.target.value)}
              aria-label="Asset filter"
            >
              {uniqueAssets.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="label">Direction</span>
            <select
              className="chip"
              value={directionFilter}
              onChange={(e) => setDirectionFilter(e.target.value)}
              aria-label="Direction filter"
            >
              {uniqueDirections.map((d) => (
                <option key={d} value={d}>
                  {d.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Receipt cards */}
      <section aria-labelledby="receipts-title" className="page-section">
        <h2 id="receipts-title" className="heading-md text-gold">
          Prediction Receipts
        </h2>

        {filtered.length === 0 ? (
          <div className="empty-state" style={{ marginTop: 'var(--space-4)' }}>
            <p className="empty-state__icon" aria-hidden="true">
              ○
            </p>
            <p className="body-md">No predictions match the current filters.</p>
            <p className="caption">
              Adjust outcome, asset, or direction filters to restore results.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4" style={{ marginTop: 'var(--space-4)' }}>
            {filtered.map((prediction) => {
              const isExpanded = expandedId === prediction.id;
              const isDimmed = prediction.outcome === 'NO VALID PREDICTION';
              const isExpired = prediction.outcome === 'SIGNAL EXPIRED';
              const isActive = prediction.outcome === 'ACTIVE';
              const grade = deriveGrade(prediction.probability);

              return (
                <article
                  key={prediction.id}
                  className={`card card-interactive ${isDimmed ? 'receipt--dimmed' : ''}`}
                  onClick={() => handleExpand(prediction)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleExpand(prediction);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-label={`Prediction ${prediction.id}: ${prediction.asset} ${prediction.direction}, ${prediction.outcome}`}
                >
                  {/* Card header */}
                  <div className="card-header">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="mono heading-sm">{prediction.id}</span>
                      <span className="mono">{prediction.asset}</span>
                      <StatusPill variant={directionToVariant(prediction.direction)}>
                        {prediction.direction}
                      </StatusPill>
                      <StatusPill variant={gradeToVariant(grade)}>{grade}</StatusPill>
                      <StatusPill variant={outcomeToVariant(prediction.outcome)}>
                        {prediction.outcome}
                      </StatusPill>
                      {isActive && (
                        <span className="pulse-dot" aria-label="Active" />
                      )}
                      {isExpired && (
                        <span className="pill pill-expired" role="status">
                          Expired
                        </span>
                      )}
                    </div>
                    <span className="mono caption">{formatPercent(prediction.probability)}</span>
                  </div>

                  {/* Receipt meta */}
                  <div className="receipt__meta">
                    <div>
                      <span className="label">Expected Return</span>
                      <span className="mono">{prediction.expectedReturn}</span>
                    </div>
                    <div>
                      <span className="label">Model Agreement</span>
                      <span className="mono">{formatPercent(prediction.modelAgreement)}</span>
                    </div>
                    <div>
                      <span className="label">Decision Window</span>
                      <span className="mono">{prediction.decisionWindow}</span>
                    </div>
                    <div>
                      <span className="label">Timestamp</span>
                      <span className="mono">{formatDateTime(prediction.timestamp)}</span>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div className="card-body" style={{ marginTop: 'var(--space-4)' }}>
                      <div className="detail-grid" style={{ marginBottom: 'var(--space-6)' }}>
                        <div>
                          <dt className="detail-item__label">Prediction ID</dt>
                          <dd className="detail-item__value mono">{prediction.id}</dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Asset</dt>
                          <dd className="detail-item__value mono">{prediction.asset}</dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Direction</dt>
                          <dd className="detail-item__value">
                            <StatusPill variant={directionToVariant(prediction.direction)}>
                              {prediction.direction}
                            </StatusPill>
                          </dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Probability</dt>
                          <dd className="detail-item__value mono">
                            {formatPercent(prediction.probability)}
                          </dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Expected Return</dt>
                          <dd className="detail-item__value mono">{prediction.expectedReturn}</dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Expected MFE</dt>
                          <dd className="detail-item__value mono">{prediction.expectedMFE}</dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Expected MAE</dt>
                          <dd className="detail-item__value mono">{prediction.expectedMAE}</dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Decision Window</dt>
                          <dd className="detail-item__value">{prediction.decisionWindow}</dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Horizon</dt>
                          <dd className="detail-item__value">{prediction.horizon}</dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Risk</dt>
                          <dd className="detail-item__value">{prediction.risk}</dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Model Agreement</dt>
                          <dd className="detail-item__value mono">
                            {formatPercent(prediction.modelAgreement)}
                          </dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Data Quality</dt>
                          <dd className="detail-item__value mono">
                            {formatPercent(prediction.dataQuality)}
                          </dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Model Version</dt>
                          <dd className="detail-item__value mono">{prediction.modelVersion}</dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Feature Version</dt>
                          <dd className="detail-item__value mono">{prediction.featureVersion}</dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Timestamp</dt>
                          <dd className="detail-item__value">
                            {formatDateTime(prediction.timestamp)}
                          </dd>
                        </div>
                        <div>
                          <dt className="detail-item__label">Outcome</dt>
                          <dd className="detail-item__value">
                            <StatusPill variant={outcomeToVariant(prediction.outcome)}>
                              {prediction.outcome}
                            </StatusPill>
                          </dd>
                        </div>
                      </div>

                      {/* Evidence */}
                      <div style={{ marginBottom: 'var(--space-4)' }}>
                        <h3 className="label">Evidence</h3>
                        <ul className="receipt__evidence" style={{ marginTop: 'var(--space-2)' }}>
                          {prediction.evidence.map((item, i) => (
                            <li key={i} className="body-sm text-secondary">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Invalidation Conditions */}
                      <div>
                        <h3 className="label">Invalidation Conditions</h3>
                        <ul className="receipt__invalidations" style={{ marginTop: 'var(--space-2)' }}>
                          {prediction.invalidationConditions.map((cond, i) => (
                            <li key={i} className="body-sm text-secondary">
                              {cond}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* ILLUSTRATIVE watermark */}
      <div className="notice-banner" role="note" style={{ marginTop: 'var(--space-8)' }}>
        <p className="body-sm">
          <strong>Illustrative data only.</strong> All prediction receipts shown
          here are synthetic. They do not represent live predictions, guaranteed
          outcomes, or financial advice. Every receipt is fabricated for
          demonstration purposes.
        </p>
      </div>
    </div>
  );
}

/** Map a derived grade string to a StatusPill variant. */
function gradeToVariant(grade: string): 'risk-high' | 'gold' | 'neutral' | 'silver' {
  const g = grade.toUpperCase();
  if (g === 'EXTREME') return 'risk-high';
  if (g === 'HIGH') return 'gold';
  return 'neutral';
}
