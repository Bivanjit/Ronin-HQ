'use client';

import { useState } from 'react';
import { SIGNALS, type Signal } from '@/lib/demo-data';
import { StatusPill } from '@/components/ui/StatusPill';
import {
  directionToVariant,
  formatDecisionWindow,
  formatPercent,
  gradeToVariant,
} from '@/lib/pill-variants';
import { useToast } from '@/lib/toast';

function SignalCard({
  signal,
  selected,
  onSelect,
}: {
  signal: Signal;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <article
      className={`card signal-card card-interactive ${
        selected ? 'signal-card--selected' : ''
      }`}
      onClick={() => onSelect(signal.id)}
      role="button"
      tabIndex={0}
      aria-expanded={selected}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(signal.id);
        }
      }}
    >
      <div className="signal-card__head">
        <span className="signal-card__asset">{signal.asset}</span>
        <StatusPill variant="silver">{signal.type}</StatusPill>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <StatusPill variant={directionToVariant(signal.direction)}>
          {signal.direction}
        </StatusPill>
        <StatusPill variant={gradeToVariant(signal.grade)}>
          {signal.grade}
        </StatusPill>
      </div>

      <div className="signal-card__stats">
        <div className="signal-card__stat">
          <span className="signal-card__statValue">
            {formatPercent(signal.probability)}
          </span>
          <div className="signal-card__statLabel">Probability</div>
        </div>
        <div className="signal-card__stat">
          <span className="signal-card__statValue">
            {formatPercent(signal.modelAgreement)}
          </span>
          <div className="signal-card__statLabel">Model Agreement</div>
        </div>
      </div>

      <p className="caption" style={{ marginTop: 'auto' }}>
        {formatDecisionWindow(signal.decisionWindow)}
      </p>

      {selected && (
        <div className="signal-card__detail">
          <p className="body-sm text-secondary">{signal.evidenceSummary}</p>
        </div>
      )}
    </article>
  );
}

/**
 * Featured Intelligence Demo — client subsection rendered on the
 * server-rendered home page.
 */
export function FeaturedSignals() {
  const { addToast } = useToast();
  const [selectedId, setSelectedId] = useState<string | null>(SIGNALS[0].id);
  const featured = SIGNALS.slice(0, 3);

  function handleSelect(id: string) {
    setSelectedId(id);
    addToast(
      `Signal ${id} selected — ${featured.find((s) => s.id === id)?.asset ?? ''} evidence view`,
      'info',
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {featured.map((signal) => (
        <SignalCard
          key={signal.id}
          signal={signal}
          selected={selectedId === signal.id}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}