'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WALLETS, WALLET_EDGES, type WalletNode } from '@/lib/demo-data';
import { StatusPill } from '@/components/ui/StatusPill';
import {
  formatActivity,
  formatPercent,
} from '@/lib/pill-variants';
import { useToast } from '@/lib/toast';

/* ------------------------------------------------------------
   Cohort color map (derived since data has no cohortColor)
   ------------------------------------------------------------ */

const COHORT_COLORS: Record<string, string> = {
  'Tier 1 Accumulator': '#C59A57',
  'Cross-Chain Specialist': '#0EA5E9',
  'DeFi Optimizer': '#7C3AED',
  'Trend Follower': '#22C55E',
  'Reversal Hunter': '#C51E29',
  'Multi-Vertical': '#F59E0B',
  'Staking Specialist': '#8B5CF6',
};

function cohortColor(cohort: string): string {
  return COHORT_COLORS[cohort] ?? '#6B7280';
}

/* ------------------------------------------------------------
   Derived circle-layout positions (7 nodes)
   ------------------------------------------------------------ */

function computeNodePositions(
  wallets: WalletNode[],
  width: number,
  height: number,
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.32;

  wallets.forEach((w, i) => {
    const angle = (2 * Math.PI * i) / wallets.length - Math.PI / 2;
    positions.set(w.id, {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    });
  });

  return positions;
}

/* ------------------------------------------------------------
   WalletPage
   ------------------------------------------------------------ */

export default function WalletsPage() {
  const { addToast } = useToast();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'viz' | 'table'>('viz');
  const [cohortFilter, setCohortFilter] = useState<string>('ALL');
  const [sortKey, setSortKey] = useState<'concentration' | 'leadTimeDays'>('concentration');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const svgRef = useRef<SVGSVGElement>(null);

  const cohorts = useMemo(() => {
    const set = new Set(WALLETS.map((w) => w.cohort));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let list = WALLETS;
    if (cohortFilter !== 'ALL') {
      list = list.filter((w) => w.cohort === cohortFilter);
    }
    const sorted = [...list].sort((a, b) => {
      const sign = sortDir === 'asc' ? 1 : -1;
      return sign * (a[sortKey] - b[sortKey]);
    });
    return sorted;
  }, [cohortFilter, sortDir, sortKey]);

  const walletMap = useMemo(() => new Map(WALLETS.map((w) => [w.id, w])), []);

  const filteredEdges = useMemo(() => {
    const ids = new Set(filtered.map((w) => w.id));
    return WALLET_EDGES.filter((e) => ids.has(e.source) && ids.has(e.target));
  }, [filtered]);

  const positions = useMemo(() => computeNodePositions(WALLETS, 520, 400), []);

  const selected = useMemo(
    () => (selectedId ? WALLETS.find((w) => w.id === selectedId) ?? null : null),
    [selectedId],
  );

  const handleNodeClick = useCallback(
    (id: string) => {
      setSelectedId(id);
      const w = walletMap.get(id);
      if (w) addToast(`Selected ${w.label} (${w.address})`, 'info');
    },
    [walletMap, addToast],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNodeClick(id);
      }
    },
    [handleNodeClick],
  );

  // Focus management for keyboard accessibility
  useEffect(() => {
    if (selectedId && svgRef.current) {
      const node = svgRef.current.querySelector(`[data-wallet-id="${selectedId}"]`);
      if (node instanceof HTMLElement) node.focus();
    }
  }, [selectedId]);

  return (
    <div className="page-root">
      {/* Header */}
      <div className="section-header-row">
        <div>
          <p className="section-kicker">Wallet Intelligence</p>
          <h1 className="display-md">Wallet Clusters</h1>
          <p className="body-sm text-secondary">
            Behavioral analysis of tracked wallets: cohort classification,
            concentration metrics, and relationship edges. All data is illustrative.
          </p>
        </div>
        <span className="label text-gold">ILLUSTRATIVE DATA</span>
      </div>

      {/* View toggle + cohort filter + sort controls */}
      <section aria-label="Controls" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
          <div className="flex items-center gap-2">
            <span className="label">View</span>
            <button
              type="button"
              className={`chip chip--${viewMode === 'viz' ? 'active' : 'idle'}`}
              onClick={() => setViewMode('viz')}
              aria-pressed={viewMode === 'viz'}
            >
              Cluster
            </button>
            <button
              type="button"
              className={`chip chip--${viewMode === 'table' ? 'active' : 'idle'}`}
              onClick={() => setViewMode('table')}
              aria-pressed={viewMode === 'table'}
            >
              Table
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="label">Cohort</span>
            <select
              className="chip"
              value={cohortFilter}
              onChange={(e) => setCohortFilter(e.target.value)}
              aria-label="Cohort filter"
            >
              {cohorts.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="label">Sort</span>
            <button
              type="button"
              className={`chip chip--${sortKey === 'concentration' ? 'active' : 'idle'}`}
              onClick={() => {
                if (sortKey === 'concentration') setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
                else {
                  setSortKey('concentration');
                  setSortDir('desc');
                }
              }}
            >
              Concentration {sortKey === 'concentration' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </button>
            <button
              type="button"
              className={`chip chip--${sortKey === 'leadTimeDays' ? 'active' : 'idle'}`}
              onClick={() => {
                if (sortKey === 'leadTimeDays') setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
                else {
                  setSortKey('leadTimeDays');
                  setSortDir('desc');
                }
              }}
            >
              Lead Time {sortKey === 'leadTimeDays' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
            </button>
          </div>
        </div>
      </section>

      {/* SVG Cluster Viz */}
      {viewMode === 'viz' && (
        <section
          aria-label="Wallet cluster visualization"
          className="card"
          style={{ marginBottom: 'var(--space-6)' }}
        >
          <div className="card-header">
            <h2 className="heading-sm">Wallet Relationship Cluster</h2>
            <span className="caption text-muted">
              Tab to focus nodes · Enter to select
            </span>
          </div>
          <div className="viz-wrap">
            <svg
              ref={svgRef}
              viewBox="0 0 520 400"
              width="100%"
              style={{ maxWidth: 520, margin: '0 auto', display: 'block' }}
              role="img"
              aria-label="Wallet cluster diagram showing relationships between tracked wallets"
            >
              {/* Edges */}
              {filteredEdges.map((edge, i) => {
                const from = positions.get(edge.source);
                const to = positions.get(edge.target);
                if (!from || !to) return null;
                return (
                  <line
                    key={i}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="var(--line)"
                    strokeWidth={edge.strength * 4}
                    strokeOpacity={0.5}
                  />
                );
              })}

              {/* Nodes */}
              {WALLETS.map((wallet) => {
                const pos = positions.get(wallet.id);
                if (!pos) return null;
                const isSelected = selectedId === wallet.id;
                const color = cohortColor(wallet.cohort);
                const r = 12 + wallet.concentration * 12;

                return (
                  <g
                    key={wallet.id}
                    data-wallet-id={wallet.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`${wallet.label}: ${wallet.cohort}, concentration ${formatPercent(wallet.concentration)}`}
                    aria-selected={isSelected}
                    onClick={() => handleNodeClick(wallet.id)}
                    onKeyDown={(e) => handleKeyDown(e, wallet.id)}
                    style={{ cursor: 'pointer', outline: 'none' }}
                  >
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={r}
                      fill={color}
                      fillOpacity={isSelected ? 1 : 0.7}
                      stroke={isSelected ? '#FFF' : 'none'}
                      strokeWidth={isSelected ? 2 : 0}
                    />
                    <text
                      x={pos.x}
                      y={pos.y + r + 14}
                      textAnchor="middle"
                      fill="var(--bone)"
                      fontSize="10"
                      fontFamily="var(--font-body, sans-serif)"
                    >
                      {wallet.label.length > 16
                        ? wallet.label.slice(0, 14) + '…'
                        : wallet.label}
                    </text>
                    {isSelected && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={r + 4}
                        fill="none"
                        stroke={color}
                        strokeWidth={2}
                        strokeOpacity={0.4}
                        className="pulse-dot"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="viz-legend" style={{ marginTop: 'var(--space-4)' }}>
            <span className="label">Cohorts</span>
            <div className="flex flex-wrap gap-3" style={{ marginTop: 'var(--space-2)' }}>
              {cohorts.filter((c) => c !== 'ALL').map((c) => (
                <span key={c} className="flex items-center gap-1 caption">
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: cohortColor(c),
                    }}
                  />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Table view */}
      {viewMode === 'table' && (
        <section
          aria-labelledby="wallet-table-title"
          className="page-section"
          style={{ marginBottom: 'var(--space-6)' }}
        >
          <h2 id="wallet-table-title" className="heading-md text-gold">
            Wallet Profiles
          </h2>
          <div className="table-wrap" style={{ marginTop: 'var(--space-4)' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Label</th>
                  <th>Cohort</th>
                  <th>Concentration</th>
                  <th>Behavioral Pattern</th>
                  <th>Last Activity</th>
                  <th>Lead Time</th>
                  <th>Outcome Note</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((wallet) => {
                  const isSelected = selectedId === wallet.id;
                  return (
                    <tr
                      key={wallet.id}
                      onClick={() => handleNodeClick(wallet.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleNodeClick(wallet.id);
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
                      <td className="mono">{wallet.address}</td>
                      <td>{wallet.label}</td>
                      <td>
                        <StatusPill variant="neutral">{wallet.cohort}</StatusPill>
                      </td>
                      <td className="mono">{formatPercent(wallet.concentration)}</td>
                      <td className="caption">{wallet.behavioralPattern}</td>
                      <td className="caption">{formatActivity(wallet.lastActivity)}</td>
                      <td className="mono">{wallet.leadTimeDays}d</td>
                      <td className="caption">{wallet.outcomeNote}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Selected wallet detail */}
      {selected && (
        <section
          className="card"
          aria-labelledby="wallet-detail-title"
          style={{ marginTop: 'var(--space-6)' }}
        >
          <div className="card-header">
            <div>
              <h2 id="wallet-detail-title" className="heading-sm">
                {selected.label} — {selected.id}
              </h2>
              <p className="caption mono">{selected.address}</p>
            </div>
            <StatusPill variant="gold">ILLUSTRATIVE</StatusPill>
          </div>

          <div className="detail-grid" style={{ marginTop: 'var(--space-4)' }}>
            <div>
              <dt className="detail-item__label">Cohort</dt>
              <dd className="detail-item__value">
                <StatusPill variant="neutral">{selected.cohort}</StatusPill>
              </dd>
            </div>
            <div>
              <dt className="detail-item__label">Concentration</dt>
              <dd className="detail-item__value mono">
                {formatPercent(selected.concentration)}
              </dd>
            </div>
            <div>
              <dt className="detail-item__label">Behavioral Pattern</dt>
              <dd className="detail-item__value">{selected.behavioralPattern}</dd>
            </div>
            <div>
              <dt className="detail-item__label">Last Activity</dt>
              <dd className="detail-item__value">{formatActivity(selected.lastActivity)}</dd>
            </div>
            <div>
              <dt className="detail-item__label">Lead Time</dt>
              <dd className="detail-item__value">
                {selected.leadTimeDays} day{selected.leadTimeDays !== 1 ? 's' : ''}
              </dd>
            </div>
            <div>
              <dt className="detail-item__label">Outcome Note</dt>
              <dd className="detail-item__value">{selected.outcomeNote}</dd>
            </div>
          </div>

          {/* Connected edges */}
          {(() => {
            const connectedEdges = WALLET_EDGES.filter(
              (e) => e.source === selected.id || e.target === selected.id,
            );
            if (connectedEdges.length === 0) return null;
            return (
              <div style={{ marginTop: 'var(--space-6)' }}>
                <h3 className="label">Relationship Edges</h3>
                <ul style={{ marginTop: 'var(--space-2)' }}>
                  {connectedEdges.map((edge, i) => {
                    const otherId =
                      edge.source === selected.id ? edge.target : edge.source;
                    const other = walletMap.get(otherId);
                    return (
                      <li key={i} className="body-sm text-secondary" style={{ marginBottom: 'var(--space-2)' }}>
                        <span className="mono">{other?.label ?? otherId}</span>
                        {' — '}
                        {edge.relationship} (strength {formatPercent(edge.strength)})
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })()}
        </section>
      )}

      {/* Illustrative note */}
      <div className="notice-banner" role="note" style={{ marginTop: 'var(--space-8)' }}>
        <p className="body-sm">
          <strong>Illustrative data only.</strong> All wallet addresses,
          behavioral patterns, cohort classifications, and relationship edges
          are synthetic. This interface is for research and demonstration
          purposes only and does not constitute financial advice.
        </p>
      </div>
    </div>
  );
}
