'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavLink {
  readonly label: string;
  readonly path: string;
}

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  links: readonly NavLink[];
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MobileNavigation({
  isOpen,
  onClose,
  currentPath,
  links,
}: MobileNavigationProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store the element that had focus before the overlay opened
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Focus the close button when panel opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Restore focus to the hamburger button when panel closes
  useEffect(() => {
    if (!isOpen && previousFocusRef.current) {
      const el = previousFocusRef.current;
      // Small delay to let the animation complete
      const timer = setTimeout(() => {
        el.focus();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusableElements = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-navigation"
      ref={panelRef}
      className={'mobile-nav' + (isOpen ? ' mobile-nav--open' : '')}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className="mobile-nav__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="mobile-nav__panel">
        <div className="mobile-nav__header">
          <span className="mobile-nav__title">RONIN</span>
          <button
            ref={closeButtonRef}
            className="mobile-nav__close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          <ul className="mobile-nav__links">
            {links.map(({ label, path }) => {
              const isActive =
                currentPath === path ||
                currentPath.startsWith(path + '/');
              return (
                <li key={path}>
                  <Link
                    href={path}
                    className={
                      'mobile-nav__link' +
                      (isActive ? ' mobile-nav__link--active' : '')
                    }
                    aria-current={isActive ? 'page' : undefined}
                    onClick={onClose}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-nav__footer">
          <p className="mobile-nav__footer-text">
            Illustrative demonstration data only. Not financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
