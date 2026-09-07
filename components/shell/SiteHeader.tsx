'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileNavigation from './MobileNavigation';

const NAV_LINKS = [
  { label: 'Terminal', path: '/terminal' },
  { label: 'Predictions', path: '/predictions' },
  { label: 'Wallets', path: '/wallets' },
  { label: 'Rankings', path: '/rankings' },
  { label: 'Research', path: '/research' },
  { label: 'Access', path: '/access' },
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen((prev) => !prev);
  }, []);

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  return (
    <>
      <header className="site-header" role="banner">
        <div className="site-header__inner">
          {/* Logo */}
          <Link href="/" className="site-header__logo" aria-label="RONIN home">
            <span className="site-header__logo-text">RONIN</span>
            <span className="site-header__logo-kanji" aria-hidden="true">
              影
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="site-header__nav" aria-label="Main navigation">
            <ul className="site-header__nav-list">
              {NAV_LINKS.map(({ label, path }) => {
                const isActive =
                  pathname === path || pathname.startsWith(path + '/');
                return (
                  <li key={path}>
                    <Link
                      href={path}
                      className={
                        'site-header__nav-link' +
                        (isActive ? ' site-header__nav-link--active' : '')
                      }
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Illustrative Data Badge */}
          <div
            className="site-header__badge"
            aria-label="Data is illustrative only"
          >
            <span className="site-header__badge-dot" aria-hidden="true" />
            Illustrative
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={hamburgerRef}
            className="site-header__hamburger"
            onClick={toggleMobileNav}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-navigation"
            aria-label={
              mobileNavOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
          >
            <span
              className={
                'site-header__hamburger-line' +
                (mobileNavOpen
                  ? ' site-header__hamburger-line--open'
                  : '')
              }
            />
            <span
              className={
                'site-header__hamburger-line' +
                (mobileNavOpen
                  ? ' site-header__hamburger-line--open'
                  : '')
              }
            />
            <span
              className={
                'site-header__hamburger-line' +
                (mobileNavOpen
                  ? ' site-header__hamburger-line--open'
                  : '')
              }
            />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileNavigation
        isOpen={mobileNavOpen}
        onClose={closeMobileNav}
        currentPath={pathname}
        links={NAV_LINKS}
      />
    </>
  );
}
