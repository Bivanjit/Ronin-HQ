'use client';

import { useMemo, useState } from 'react';
import { REGIMES, SIGNALS, type Signal } from '@/lib/demo-data';
import { StatusPill } from '@/components/ui/StatusPill';
import {
  directionToVariant,
  formatDateTime,
  formatDecisionWindow,
  formatPercent,
  gradeToVariant,
  riskToVariant,
} from '@/lib/pill-variants';
import { useToast } from '@/lib/toast';

type AssetFilter = 'ALL' | 'ETH' | 'SOL' | 'BTC' | 'L2';
type TypeFilter = 'ALL' | Signal['type'];
type GradeFilter = 'ALL' | Signal['grade'];

type SortKey = 'asset' | 'type' | 'direction' | 'grade' | 'probability' | 'modelAgreement' | 'riskScore' | 'decisionWindow' | 'timestamp';
type SortDir = 'asc' | 'desc';

const GRADE_WEIGHT: Record<string, number> = {
  EXTREME: 5,
  HIGH: 4,
  MEDIUM: 3,
  MODERATE: 2,
  LOW: 1,
};

const REGIME_BY_ID = new Map(REGIMES.map((r) => [r.id, r]));

const TYPE_FILTERS: readonly TypeFilter[] = [
  'ALL',
  'momentum',
  'reversal',
  'accumulation',
  'distribution',
  'liquidity',
  'volatility',
];

const GRADE_FILTERS: readonly GradeFilter[] = ['ALL', 'EXTREME', 'HIGH', 'MEDIUM', 'LOW'];

function assetMatches(signal: Signal, filter: AssetFilter): boolean {
  if (filter === 'ALL') return true;
  if (filter === 'L2') return signal.asset === 'ARB' || signal.asset === 'OP';
  return signal.asset === filter;
}

export default function TerminalPage() {
  const { addToast } = useToast();

  const [assetFilter, setAssetFilter] = useState<AssetFilter>('ALL');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('ALL');
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>('ALL');
  const [sortKey, setSortKey] = useState<SortKey>('timestamp');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [selectedId, setSelectedId] = useState<string | null>(SIGNALS[0]?.id ?? null);

  const overview = useMemo(() => {
    const avgAgreement = SIGNALS.reduce((sum, s) => sum + s.modelAgreement, 0) / Math.max(SIGNALS.length, 1);
    const avgQuality = SIGNALS.reduce((sum, s) => sum + s.dataQuality, 0) / Math.max(SIGNALS.length, 1);
    const activeRegime = REGIMES[0];
    return {
      regime: activeRegime,
      modelAgreement: avgAgreement,
      activeOpportunities: SIGNALS.filter((s) => s.grade === 'HIGH' || s.grade === 'EXTREME').length,
      dataQuality: avgQuality,
    };
  }, []);

  const filtered = useMemo(() => {
    const list = SIGNALS.filter(
      (s) =>
        assetMatches(s, assetFilter) &&
        (typeFilter === 'ALL' || s.type === typeFilter) &&
        (gradeFilter === 'ALL' || s.grade === gradeFilter),
    );

    const sorted = [...list].sort((a, b) => {
      const sign = sortDir === 'asc' ? 1 : -1;
      switch (sortKey) {
        case 'asset':
          return sign * a.asset.localeCompare(b.asset);
        case 'type':
          return sign * a.type.localeCompare(b.type);
        case 'direction':
          return sign * a.direction.localeCompare(b.direction);
        case 'grade':
          return sign * ((GRADE_WEIGHT[a.grade] ?? 0) - (GRADE_WEIGHT[b.grade] ?? 0));
        case 'probability':
          return sign * (a.probability - b.probability);
        case 'modelAgreement':
          return sign * (a.modelAgreement - b.modelAgreement);
        case 'riskScore':
          return sign * (a.riskScore - b.riskScore);
        case 'decisionWindow':
          return sign * (new Date(a.decisionWindow).getTime() - new Date(b.decisionWindow).getTime());
        case 'timestamp':
        default:
          return sign * (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      }
    });

    return sorted;
  }, [assetFilter, gradeFilter, sortDir, sortKey, typeFilter]);

  const selected = useMemo(
    () => (selectedId ? (filtered.find((s) => s.id === selectedId) ?? null) : null),
    [filtered, selectedId],
  );

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    addToast(`Sorted by ${key}`, 'info');
  }

  function handleSelect(signal: Signal) {
    setSelectedId(signal.id);
    addToast(`Selected signal ${signal.id} — ${signal.asset} (${signal.direction})`, 'info');
  }

  const selectedRegime = selected ? REGIME_BY_ID.get(selected.marketRegimeId) ?? null : null;

  return (
    <div className="page-root">
      <div className="section-header-row">
        <div>
          <p className="section-kicker">Terminal Dashboard</p>
          <h1 className="display-md">Signal Terminal</h1>
          <p className="body-sm text-secondary">
            Illustrative ledger of on-chain signals with regime context, evidence,
            and invalidation. All data is illustrative.
          </p>
        </div>
        <span className="label text-gold">ILLUSTRATIVE DATA</span>
      </div>

      {/* Market Overview */}
      <section className="overview-grid" aria-label="Market overview" style={{ marginBottom: 'var(--space-8)' }}>
        <div className="stat-card">
          <span className="stat-label">Market Regime</span>
          <span className="stat-value" style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
            {overview.regime.name}
          </span>
          <span className="caption">
            Confidence {formatPercent(overview.regime.confidence)} ·{' '}
            {overview.regime.description.slice(0, 80)}…
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Model Agreement (avg)</span>
          <span className="stat-value">{formatPercent(overview.modelAgreement)}</span>
          <span className="caption">Across active signals</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Active Opportunities</span>
          <span className="stat-value">{overview.activeOpportunities}</span>
          <span className="caption">HIGH / EXTREME signals</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Data Quality (avg)</span>
          <span className="stat-value">{formatPercent(overview.dataQuality)}</span>
          <span className="caption">Out of tracked signals</span>
        </div>
      </section>

      {/* Filter bar */}
      <section aria-label="Filters" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="label">Asset</span>
            {(
              ['ALL', 'ETH', 'SOL', 'BTC', 'L2'] as const
            ).map((label) => (
              <button
                key={label}
                type="button"
                className={`chip chip--${assetFilter === label ? 'active' : 'idle'}`}
                aria-pressed={assetFilter === label}
                onClick={() => setAssetFilter(label)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="label">Signal Type</span>
            <select
              className="chip"
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value as TypeFilter)}
              aria-label="Signal type filter"
            >
              {TYPE_FILTERS.map((t) => (
                <option key={t} value={t}>
                  {t.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="label">Grade</span>
            <select
              className="chip"
              value={gradeFilter}
              onChange={(event) => setGradeFilter(event.target.value as GradeFilter)}
              aria-label="Grade filter"
            >
              {GRADE_FILTERS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Signal Ledger */}
      <section aria-labelledby="ledger-title" className="page-section">
        <h2 id="ledger-title" className="heading-md text-gold">
          Signal Ledger
        </h2>

        {filtered.length === 0 ? (
          <div className="empty-state" style={{ marginTop: 'var(--space-4)' }}>
            <p className="empty-state__icon" aria-hidden="true">
              ○
            </p>
            <p className="body-md">No signals match the current filters.</p>
            <p className="caption">
              Adjust asset, signal type, or grade filters to restore results.
            </p>
          </div>
        ) : (
          <div className="table-wrap" style={{ marginTop: 'var(--space-4)' }}>
            <table className="table">
              <thead>
                <tr>
                  {(
                    [
                      { label: 'Asset', key: 'asset' as SortKey },
                      { label: 'Type', key: 'type' as SortKey },
                      { label: 'Direction', key: 'direction' as SortKey },
                      { label: 'Grade', key: 'grade' as SortKey },
                      { label: 'Probability', key: 'probability' as SortKey },
                      { label: 'Model Agreement', key: 'modelAgreement' as SortKey },
                      { label: 'Risk', key: 'riskScore' as SortKey },
                      { label: 'Decision Window', key: 'decisionWindow' as SortKey },
                    ] as const
                  ).map(({ label, key }) => (
                    <th key={key}>
                      <button
                        type="button"
                        className="label"
                        style={{
                          color: sortKey === key ? 'var(--gold)' : 'inherit',
                          cursor: 'pointer',
                          background: 'none',
                          border: 'none',
                        }}
                        onClick={() => toggleSort(key)}
                        aria-sort={
                          sortKey === key
                            ? sortDir === 'asc'
                              ? 'ascending'
                              : 'descending'
                            : 'none'
                        }
                      >
                        {label}
                        {sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((signal) => {
                  const isSelected = selectedId === signal.id;
                  return (
                    <tr
                      key={signal.id}
                      onClick={() => handleSelect(signal)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          handleSelect(signal);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-selected={isSelected}
                      style={{
                        cursor: 'pointer',
                        background: isSelected ? 'var(--gold-dim)' : undefined,
                        outline: isSelected ? '1px solid rgba(197, 154, 87, 0.3)' : undefined,
                      }}
                    >
                      <td className="mono">{signal.asset}</td>
                      <td className="caption">{signal.type}</td>
                      <td>
                        <StatusPill variant={directionToVariant(signal.direction)}>
                          {signal.direction}
                        </StatusPill>
                      </td>
                      <td>
                        <StatusPill variant={gradeToVariant(signal.grade)}>
                          {signal.grade}
                        </StatusPill>
                      </td>
                      <td className="mono">{formatPercent(signal.probability)}</td>
                      <td className="mono">{formatPercent(signal.modelAgreement)}</td>
                      <td>
                        <StatusPill variant={riskToVariant(signal.riskScore)}>
                          {Math.round(signal.riskScore * 100)}
                        </StatusPill>
                      </td>
                      <td className="caption">{formatDecisionWindow(signal.decisionWindow)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Selected signal detail */}
      {selected && (
        <section className="card" style={{ marginTop: 'var(--space-8)' }} aria-labelledby="detail-title">
          <div className="card-header">
            <div>
              <h2 id="detail-title" className="heading-sm">
                {selected.asset} — {selected.id}
              </h2>
              <p className="caption">
                {formatDateTime(selected.timestamp)} · Decision window:{' '}
                {formatDecisionWindow(selected.decisionWindow)}
              </p>
            </div>
            <StatusPill variant="gold">ILLUSTRATIVE</StatusPill>
          </div>

          <div className="detail-grid">
            <div>
              <dt className="detail-item__label">Direction</dt>
              <dd className="detail-item__value">
                <StatusPill variant={directionToVariant(selected.direction)}>
                  {selected.direction}
                </StatusPill>
              </dd>
            </div>
            <div>
              <dt className="detail-item__label">Grade</dt>
              <dd className="detail-item__value">
                <StatusPill variant={gradeToVariant(selected.grade)}>
                  {selected.grade}
                </StatusPill>
              </dd>
            </div>
            <div>
              <dt className="detail-item__label">Probability</dt>
              <dd className="detail-item__value mono">{formatPercent(selected.probability)}</dd>
            </div>
            <div>
              <dt className="detail-item__label">Model Agreement</dt>
              <dd className="detail-item__value mono">{formatPercent(selected.modelAgreement)}</dd>
            </div>
            <div>
              <dt className="detail-item__label">Data Quality</dt>
              <dd className="detail-item__value mono">{formatPercent(selected.dataQuality)}</dd>
            </div>
            <div>
              <dt className="detail-item__label">Risk Score</dt>
              <dd className="detail-item__value">
                <StatusPill variant={riskToVariant(selected.riskScore)}>
                  {Math.round(selected.riskScore * 100)} —{' '}
                  {selected.riskScore >= 0.6 ? 'High' : selected.riskScore >= 0.4 ? 'Moderate' : 'Low'}
                </StatusPill>
              </dd>
            </div>
            <div>
              <dt className="detail-item__label">Regime Context</dt>
              <dd className="detail-item__value">
                {selectedRegime ? `${selectedRegime.name} (${formatPercent(selectedRegime.confidence)})` : '—'}
              </dd>
            </div>
            <div>
              <dt className="detail-item__label">Decision Window (deadline)</dt>
              <dd className="detail-item__value">
                {formatDecisionWindow(selected.decisionWindow)} · {formatDateTime(selected.decisionWindow)}
              </dd>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-6)' }}>
            <h3 className="label">Evidence</h3>
            <p className="body-sm text-secondary" style={{ marginTop: 'var(--space-2)' }}>
              {selected.evidenceSummary}
            </p>
          </div>

          {selectedRegime && (
            <div style={{ marginTop: 'var(--space-6)' }}>
              <h3 className="label">Regime Description</h3>
              <p className="body-sm text-secondary" style={{ marginTop: 'var(--space-2)' }}>
                {selectedRegime.description}
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}