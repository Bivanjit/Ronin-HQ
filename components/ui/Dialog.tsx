'use client';

/**
 * RONIN HQ — Accessible Dialog Component
 *
 * Features:
 * - Focus trap within the dialog
 * - Escape key to close
 * - Backdrop click to close
 * - Focus restoration to trigger element
 * - aria-modal, role="dialog", aria-labelledby
 * - Body scroll lock when open
 */

import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

/* ------------------------------------------------------------
   Types
   ------------------------------------------------------------ */

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  showCloseButton?: boolean;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/* ------------------------------------------------------------
   Component
   ------------------------------------------------------------ */

export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Save the element that triggered the dialog so we can restore focus later
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Lock body scroll and restore focus when dialog closes
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add('dialog-open');

    return () => {
      document.body.classList.remove('dialog-open');

      // Restore focus to the element that opened the dialog
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    };
  }, [isOpen]);

  // Focus trap
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const container = dialogRef.current;
      if (!container) return;

      const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift+Tab: wrap from first to last
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: wrap from last to first
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [onClose],
  );

  // Focus the dialog or first focusable element on open
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    // Small delay to allow the DOM to render
    const timer = requestAnimationFrame(() => {
      const container = dialogRef.current;
      if (!container) return;

      const firstFocusable = container.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        container.focus();
      }
    });

    return () => cancelAnimationFrame(timer);
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      // Only close if clicking the backdrop itself, not children
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!isOpen) return null;

  return createPortal(
    <div
      className="dialog-backdrop open"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      aria-hidden={!isOpen}
    >
      <div
        ref={dialogRef}
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1}
      >
        <div className="dialog-header">
          <h2 id="dialog-title" className="dialog-title">
            {title}
          </h2>
          {showCloseButton && (
            <button
              className="dialog-close"
              onClick={onClose}
              aria-label="Close dialog"
              type="button"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="dialog-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
