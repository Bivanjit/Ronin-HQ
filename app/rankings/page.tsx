'use client';

import { useMemo, useState } from 'react';
import { RANKING_BOARDS, type RankingEntry, type RankingStatus } from '@/lib/demo-data';
import { StatusPill } from '@/components/ui/StatusPill';
import { formatPercent, statusToVariant } from '@/lib/pill-variants';
import { useToast } from '@/lib/toast';

type SortKey = 'score' | 'confidence';
type SortDir = 'asc' | 'desc';

function rankBadge(rank: number): string {
  if (rank === 1) return 'rank-badge rank-badge--gold';
  if (rank === 2) return 'rank-badge rank-badge--silver';
  if (rank === 3) return 'rank-badge rank-badge--bronze';
  return 'rank-badge rank-badge--plain';
}

function changeIndicator(change: string): { className: string; label: string } {
  if (change.startsWith('+'))
    return { className: 'change-up', label: `Up ${change}` };
  if (change.startsWith('-'))
    return { className: 'change-down', label: `Down ${change}` };
  return { className: 'change-flat', label: 'No change' };
}

export default function RankingsPage() {
  const { addToast } = useToast();

  const [boardIndex, setBoardIndex] = useState(0);
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const board = RANKING_BOARDS[boardIndex] ?? RANKING_BOARDS[0];

  const sortedEntries = useMemo(() => {
    const entries = [...board.entries];
    entries.sort((a, b) => {
      const sign = sortDir === 'asc' ? 1 : -1;
      return sign * (a[sortKey] - b[sortKey]);
    });
    return entries;
  }, [board.entries, sortKey, sortDir]);

  function handleBoardSwitch(index: number) {
    setBoardIndex(index);
    const b = RANKING_BOARDS[index];
    addToast(`Viewing board: ${b?.title}`, 'info');
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  return (
    <div className="page-root">
      {/* Header */}
      <div className="section-header-row">
        <div>
          <p className="section-kicker">Rankings</p>
          <h1 className="display-md">Observation Ranking</h1>
          <p className="body-sm text-secondary">
            Composite observation boards across assets, models, wallets, and
            regimes. Scores reflect signal quality and model agreement — not
            investment performance.
          </p>
        </div>
        <span className="label text-gold">Demonstration Data</span>
      </div>

      {/* Board tabs */}
      <section aria-label="Board navigation" style={{ marginBottom: 'var(--space-6)' }}>
        <div
          className="card"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            padding: 'var(--space-3)',
          }}
        >
          {RANKING_BOARDS.map((b, i) => (
            <button
              key={b.id}
              type="button"
              className={`chip chip--${boardIndex === i ? 'active' : 'idle'}`}
              aria-pressed={boardIndex === i}
              onClick={() => handleBoardSwitch(i)}
            >
              {b.title}
            </button>
          ))}
        </div>
      </section>

      {/* Active board */}
      <section aria-labelledby="board-title" className="page-section">
        <div className="section-header-row" style={{ marginBottom: 'var(--space-4)' }}>
          <div>
            <h2 id="board-title" className="display-md">
              {board.title}
            </h2>
            <p className="body-sm text-secondary">{board.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill variant="gold">Observation Ranking</StatusPill>
          </div>
        </div>

        {/* Sort controls */}
        <div
          className="flex items-center gap-2 flex-wrap"
          style={{ marginBottom: 'var(--space-4)' }}
        >
          <span className="label">Sort by</span>
          <button
            type="button"
            className={`chip chip--${sortKey === 'score' ? 'active' : 'idle'}`}
            onClick={() => handleSort('score')}
          >
            Score {sortKey === 'score' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
          <button
            type="button"
            className={`chip chip--${sortKey === 'confidence' ? 'active' : 'idle'}`}
            onClick={() => handleSort('confidence')}
          >
            Confidence {sortKey === 'confidence' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
          </button>
        </div>

        {/* Entries table */}
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Rank</th>
                <th>Name / Asset</th>
                <th>
                  <button
                    type="button"
                    className="label"
                    style={{
                      color: sortKey === 'score' ? 'var(--gold)' : 'inherit',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}
                    onClick={() => handleSort('score')}
                    aria-sort={
                      sortKey === 'score'
                        ? sortDir === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    Score {sortKey === 'score' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                  </button>
                </th>
                <th>Change</th>
                <th>
                  <button
                    type="button"
                    className="label"
                    style={{
                      color: sortKey === 'confidence' ? 'var(--gold)' : 'inherit',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}
                    onClick={() => handleSort('confidence')}
                    aria-sort={
                      sortKey === 'confidence'
                        ? sortDir === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    Confidence{' '}
                    {sortKey === 'confidence' ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                  </button>
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry: RankingEntry) => {
                const badge = rankBadge(entry.rank);
                const change = changeIndicator(entry.change);
                return (
                  <tr key={entry.name}>
                    <td>
                      <span className={badge} aria-label={`Rank ${entry.rank}`}>
                        {entry.rank}
                      </span>
                    </td>
                    <td className="mono">{entry.name}</td>
                    <td className="mono" style={{ fontWeight: 600 }}>
                      {entry.score}
                    </td>
                    <td>
                      <span className={change.className}>
                        {entry.change}
                      </span>
                    </td>
                    <td className="mono">{formatPercent(entry.confidence)}</td>
                    <td>
                      <StatusPill variant={statusToVariant(entry.status)}>
                        {entry.status}
                      </StatusPill>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Board explanation */}
        <div className="card" style={{ marginTop: 'var(--space-6)' }}>
          <p className="body-sm text-secondary">
            <strong>About this board:</strong> {board.description} Scores are
            observation-based composites and do not represent investment returns
            or performance guarantees.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="notice-banner" role="note" style={{ marginTop: 'var(--space-8)' }}>
        <p className="body-sm">
          <strong>Demonstration data only.</strong> Rankings shown here are
          synthetic observation composites. They do not represent investment
          performance, returns, or financial advice. All data is fabricated for
          demonstration purposes.
        </p>
      </div>
    </div>
  );
}
