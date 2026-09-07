/**
 * RONIN HQ — Legal Index
 *
 * Server component. Links to all legal sub-pages with brief descriptions.
 */

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal — RONIN HQ',
  description:
    'Legal documents for the RONIN HQ illustrative intelligence interface.',
};

const LEGAL_DOCS = [
  {
    title: 'Terms of Service',
    href: '/legal/terms',
    description:
      'Terms governing use of the RONIN HQ illustrative intelligence interface.',
  },
  {
    title: 'Privacy Policy',
    href: '/legal/privacy',
    description:
      'How the interface handles data, local storage, and your privacy.',
  },
  {
    title: 'Cookie Policy',
    href: '/legal/cookies',
    description:
      'Details on cookie and local storage usage, including consent management.',
  },
  {
    title: 'Refund Policy',
    href: '/legal/refunds',
    description:
      'Refund terms for illustrative subscription tiers and founding access.',
  },
] as const;

export default function LegalIndexPage() {
  return (
    <div className="legal-page">
      <h1 className="legal-page-title">Legal</h1>
      <p className="legal-intro">
        The following documents govern your use of the RONIN HQ illustrative
        intelligence interface. All documents are provided for informational
        purposes and relate to a demonstration product.
      </p>

      <div className="legal-links-grid">
        {LEGAL_DOCS.map((doc) => (
          <Link key={doc.href} href={doc.href} className="legal-link-card">
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
          </Link>
        ))}
      </div>

      <p
        style={{
          marginTop: 'var(--space-8)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
        }}
      >
        If you have questions about any of these documents, please reach out
        through the official RONIN Telegram channel listed on the main site.
      </p>
    </div>
  );
}
