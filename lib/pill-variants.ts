/**
 * RONIN HQ — Mapping helpers from demo-data domain values
 * to StatusPill variants.
 */

import type { PillVariant } from '@/components/ui/StatusPill';

const DIRECTION_VARIANTS: Record<string, PillVariant> = {
  bullish: 'bullish',
  bearish: 'bearish',
  neutral: 'neutral',
};

export function directionToVariant(direction: string): PillVariant {
  return DIRECTION_VARIANTS[direction.toLowerCase()] ?? 'neutral';
}

const GRADE_VARIANTS: Record<string, PillVariant> = {
  EXTREME: 'risk-high',
  HIGH: 'gold',
  MEDIUM: 'neutral',
  MODERATE: 'neutral',
  LOW: 'silver',
};

export function gradeToVariant(grade: string): PillVariant {
  return GRADE_VARIANTS[grade.toUpperCase()] ?? 'neutral';
}

export function outcomeToVariant(outcome: string): PillVariant {
  const o = outcome.toUpperCase();
  if (o === 'ACTIVE') return 'active';
  if (o === 'SIGNAL EXPIRED' || o === 'EXPIRED') return 'expired';
  if (o.includes('NO VALID')) return 'expired';
  if (o === 'INVALIDATED') return 'invalid';
  return 'neutral';
}

export function statusToVariant(status: string): PillVariant {
  const s = status.toLowerCase();
  if (s === 'active') return 'active';
  if (s === 'watchlist') return 'neutral';
  if (s === 'inactive') return 'expired';
  return 'neutral';
}

export function riskToVariant(riskScore: number): PillVariant {
  return riskScore >= 0.5 ? 'risk-high' : 'risk-low';
}

/** Derive a display grade from probability when a receipt lacks one. */
export function deriveGrade(probability: number): 'HIGH' | 'MODERATE' | 'LOW' {
  if (probability >= 0.75) return 'HIGH';
  if (probability >= 0.6) return 'MODERATE';
  return 'LOW';
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}

export function formatActivity(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/** Human readable "decision window" from an ISO deadline. */
export function formatDecisionWindow(iso: string): string {
  const deadline = new Date(iso);
  if (Number.isNaN(deadline.getTime())) return iso;
  const now = Date.now();
  const diffMs = deadline.getTime() - now;
  if (diffMs <= 0) return 'Window closed';
  const hours = Math.ceil(diffMs / 3_600_000);
  if (hours < 1) return 'Closing within 1h';
  if (hours <= 48) return `${hours}h window`;
  const days = Math.ceil(hours / 24);
  return `${days}d window`;
}