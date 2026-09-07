import Link from 'next/link';

const LEGAL_LINKS = [
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Cookies', href: '/legal/cookies' },
  { label: 'Refunds', href: '/legal/refunds' },
] as const;

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <div className="site-footer__logo">
              RONIN
              <span className="site-footer__logo-kanji" aria-hidden="true">
                影
              </span>
            </div>
            <p className="site-footer__notice">
              Predictive on-chain intelligence for research and analysis.
              All data presented is illustrative and for informational purposes
              only.
            </p>
          </div>

          <nav aria-label="Legal navigation">
            <ul className="site-footer__links">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="site-footer__link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__disclaimer">
            This interface is for informational and research purposes only. It
            does not constitute financial advice. Illustrative data shown here
            does not represent guaranteed outcomes or live market conditions.
          </p>
          <span className="site-footer__illustrative">
            Illustrative Data
          </span>
        </div>
      </div>
    </footer>
  );
}
