/**
 * RONIN HQ — Status Pill Component
 *
 * Renders a color-coded badge for status indicators.
 * Each variant maps to a distinct color scheme with accessible contrast.
 */

import type { ReactNode } from 'react';

/* ------------------------------------------------------------
   Types
   ------------------------------------------------------------ */

export type PillVariant =
  | 'bullish'
  | 'bearish'
  | 'neutral'
  | 'expired'
  | 'invalid'
  | 'active'
  | 'risk-high'
  | 'risk-low'
  | 'gold'
  | 'silver';

export interface StatusPillProps {
  variant: PillVariant;
  children: ReactNode;
  /** Optional extra class names appended to the element. */
  className?: string;
}

const VARIANT_LABELS: Record<PillVariant, string> = {
  bullish: 'Bullish',
  bearish: 'Bearish',
  neutral: 'Neutral',
  expired: 'Expired',
  invalid: 'Invalid',
  active: 'Active',
  'risk-high': 'High Risk',
  'risk-low': 'Low Risk',
  gold: 'Gold',
  silver: 'Silver',
};

/* ------------------------------------------------------------
   Component
   ------------------------------------------------------------ */

export function StatusPill({
  variant,
  children,
  className,
}: StatusPillProps) {
  const baseClass = `pill pill-${variant}`;
  const mergedClass = className ? `${baseClass} ${className}` : baseClass;

  return (
    <span
      className={mergedClass}
      role="status"
      aria-label={VARIANT_LABELS[variant]}
    >
      {children}
    </span>
  );
}
