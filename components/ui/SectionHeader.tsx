/**
 * RONIN HQ — Section Header Component
 *
 * Renders a consistent section heading with optional subtitle
 * and right-aligned action slot.
 */

import type { ReactNode } from 'react';

/* ------------------------------------------------------------
   Types
   ------------------------------------------------------------ */

export interface SectionHeaderProps {
  /** Primary heading text rendered as h2. */
  title: string;
  /** Optional descriptive subtitle shown below the heading. */
  subtitle?: string;
  /** Optional right-aligned action slot (e.g., button, link). */
  action?: ReactNode;
  /** Extra class names applied to the root element. */
  className?: string;
}

/* ------------------------------------------------------------
   Component
   ------------------------------------------------------------ */

export function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: SectionHeaderProps) {
  const rootClass = className
    ? `flex items-center justify-between flex-wrap gap-4 ${className}`
    : 'flex items-center justify-between flex-wrap gap-4';

  return (
    <div className={rootClass}>
      <div>
        <h2 className="heading-md">{title}</h2>
        {subtitle && (
          <p
            className="body-sm text-secondary"
            style={{ marginTop: 'var(--space-1)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
