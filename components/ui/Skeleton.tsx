/**
 * RONIN HQ — Skeleton Loading Components
 *
 * Provides lightweight placeholder shapes for content loading states.
 * The shimmer animation is automatically disabled when the user has
 * prefers-reduced-motion enabled (handled via globals.css).
 */

import type { CSSProperties, ReactNode } from 'react';

/* ------------------------------------------------------------
   Shared helpers
   ------------------------------------------------------------ */

interface SkeletonBaseProps {
  className?: string;
  style?: CSSProperties;
}

function mergeClass(base: string, className?: string): string {
  return className ? `${base} ${className}` : base;
}

/* ------------------------------------------------------------
   SkeletonLine
   ------------------------------------------------------------ */

export interface SkeletonLineProps extends SkeletonBaseProps {
  /** Width as a CSS value. Defaults to "100%". */
  width?: string;
  /** Predefined size variant: "sm" (10px), default (14px), or "lg" (20px). */
  size?: 'sm' | 'default' | 'lg';
}

export function SkeletonLine({
  width = '100%',
  size = 'default',
  className,
  style,
}: SkeletonLineProps) {
  const sizeClass = size === 'default' ? 'skeleton-line' : `skeleton-line ${size === 'lg' ? 'lg' : 'sm'}`;

  return (
    <div
      className={mergeClass(`skeleton ${sizeClass}`, className)}
      style={{ width, ...style }}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------
   SkeletonCircle
   ------------------------------------------------------------ */

export interface SkeletonCircleProps extends SkeletonBaseProps {
  /** Diameter as a CSS value. Defaults to "40px". */
  size?: string;
}

export function SkeletonCircle({
  size = '40px',
  className,
  style,
}: SkeletonCircleProps) {
  return (
    <div
      className={mergeClass('skeleton skeleton-circle', className)}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------
   SkeletonCard
   ------------------------------------------------------------ */

export interface SkeletonCardProps extends SkeletonBaseProps {
  /** Number of text lines to render. Defaults to 3. */
  lines?: number;
  /** Show a circle avatar placeholder at the top. */
  showAvatar?: boolean;
  /** Show a title line (wider) at the top. */
  showTitle?: boolean;
}

export function SkeletonCard({
  lines = 3,
  showAvatar = false,
  showTitle = true,
  className,
  style,
}: SkeletonCardProps) {
  return (
    <div
      className={mergeClass('card', className)}
      style={style}
      aria-hidden="true"
    >
      {(showAvatar || showTitle) && (
        <div
          className="flex items-center gap-3"
          style={{ marginBottom: 'var(--space-4)' }}
        >
          {showAvatar && <SkeletonCircle size="36px" />}
          {showTitle && <SkeletonLine width="60%" size="lg" />}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }, (_, i) => (
          <SkeletonLine
            key={i}
            width={i === lines - 1 ? '75%' : '100%'}
            size="default"
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   SkeletonTable
   ------------------------------------------------------------ */

export interface SkeletonTableProps extends SkeletonBaseProps {
  /** Number of rows. Defaults to 5. */
  rows?: number;
  /** Number of columns. Defaults to 4. */
  columns?: number;
}

const COLUMN_WIDTHS = ['120px', '200px', '100px', '140px', '80px', '160px'];

export function SkeletonTable({
  rows = 5,
  columns = 4,
  className,
  style,
}: SkeletonTableProps) {
  return (
    <div
      className={mergeClass('table-wrap', className)}
      style={style}
      aria-hidden="true"
    >
      <table className="table">
        <thead>
          <tr>
            {Array.from({ length: columns }, (_, i) => (
              <th key={i}>
                <SkeletonLine
                  width={COLUMN_WIDTHS[i % COLUMN_WIDTHS.length]}
                  size="sm"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIdx) => (
            <tr key={rowIdx}>
              {Array.from({ length: columns }, (_, colIdx) => (
                <td key={colIdx}>
                  <SkeletonLine
                    width={COLUMN_WIDTHS[colIdx % COLUMN_WIDTHS.length]}
                    size="default"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------
   Composition helper — SkeletonGroup
   ------------------------------------------------------------ */

/**
 * Wraps multiple skeleton elements with consistent spacing.
 * Useful for composing custom loading states.
 */
export function SkeletonGroup({
  children,
  className,
  style,
}: {
  children: ReactNode;
} & SkeletonBaseProps) {
  return (
    <div
      className={mergeClass('flex flex-col gap-4', className)}
      style={style}
    >
      {children}
    </div>
  );
}
