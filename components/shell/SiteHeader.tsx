'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileNavigation from './MobileNavigation';
import Image from 'next/image';
import { ARTWORK } from '@/lib/artwork';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Intelligence', path: '/terminal' },
  { label: 'Tiers', path: '/access' },
  { label: 'About', path: '/research' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const toggleMobileNav = useCallback(() => setMobileNavOpen((prev) => !prev), []);
  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileNavOpen]);

  return (
    <>
      <header className="site-header" role="banner">
        <div className="site-header__inner">
          <Link href="/" className="site-header__logo" aria-label="RONIN home">
            <Image
              src={ARTWORK['ronin-official'].src}
              alt="RONIN"
              width={148}
              height={48}
              priority
              className="site-header__logo-image"
            />
          </Link>

          <nav className="site-header__nav" aria-label="Main navigation">
            <ul className="site-header__nav-list">
              {NAV_LINKS.map(({ label, path }) => {
                const isHome = path === '/';
                const isActive = isHome ? pathname === '/' : pathname === path || pathname.startsWith(path + '/');
                return (
                  <li key={path}>
                    <Link
                      href={path}
                      className={'site-header__nav-link' + (isActive ? ' site-header__nav-link--active' : '')}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="site-header__actions">
            <Link href="/access" className="ronin-header-login">Login</Link>
            <Link href="/access" className="ronin-header-join">Join Ronin <span aria-hidden="true">→</span></Link>
          </div>

          <button
            ref={hamburgerRef}
            className="site-header__hamburger"
            onClick={toggleMobileNav}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className={'site-header__hamburger-line' + (mobileNavOpen ? ' site-header__hamburger-line--open' : '')} />
            <span className={'site-header__hamburger-line' + (mobileNavOpen ? ' site-header__hamburger-line--open' : '')} />
            <span className={'site-header__hamburger-line' + (mobileNavOpen ? ' site-header__hamburger-line--open' : '')} />
          </button>
        </div>
      </header>

      <MobileNavigation
        isOpen={mobileNavOpen}
        onClose={closeMobileNav}
        currentPath={pathname}
        links={NAV_LINKS}
      />
    </>
  );
}
