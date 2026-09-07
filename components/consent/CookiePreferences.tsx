'use client';

/**
 * RONIN HQ — Cookie Preferences
 *
 * Consent banner with Accept All / Reject / Manage Preferences.
 * Manages functional and performance consent via lib/consent.
 * Essential consent is always true and cannot be toggled.
 */

import { useEffect, useState } from 'react';
import {
  hasConsented,
  loadConsent,
  saveConsent,
} from '@/lib/consent';
import { Dialog } from '@/components/ui/Dialog';

/* ------------------------------------------------------------
   Internal — Category Toggle
   ------------------------------------------------------------ */

interface CategoryProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

function CategoryToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: CategoryProps) {
  return (
    <div className="consent-toggle-row">
      <label className="consent-toggle-label" htmlFor={`toggle-${label}`}>
        <strong>{label}</strong>
        <span>{description}</span>
      </label>
      <input
        type="checkbox"
        id={`toggle-${label}`}
        role="switch"
        aria-label={label}
        aria-checked={checked}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
    </div>
  );
}

/* ------------------------------------------------------------
   Main Component
   ------------------------------------------------------------ */

export default function CookiePreferences() {
  const [hasConsentState, setHasConsentState] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [performance, setPerformance] = useState(false);

  useEffect(() => {
    const consented = hasConsented();
    setHasConsentState(consented);
    setShowBanner(!consented);

    if (consented) {
      const state = loadConsent();
      setFunctional(state.functional);
      setPerformance(state.performance);
    }
  }, []);

  const apply = (func: boolean, perf: boolean) => {
    saveConsent({ essential: true, functional: func, performance: perf });
    setFunctional(func);
    setPerformance(perf);
    setHasConsentState(true);
    setShowBanner(false);
    setShowPreferences(false);
  };

  /* Don't render anything until client-side check completes. */
  if (hasConsentState === null) return null;

  return (
    <>
      {/* ---- Consent Banner ---- */}
      {showBanner && (
        <aside
          role="region"
          aria-label="Cookie preferences"
          className="consent-banner"
        >
          <div className="consent-banner-inner">
            <p className="consent-banner-text">
              <strong>Cookie preferences.</strong> This interface uses only
              essential storage to remember your preferences. No tracking,
              analytics, or third-party cookies are used by default. Manage
              your preferences below.
            </p>
            <div className="consent-banner-actions">
              <button
                type="button"
                className="btn btn-gold"
                onClick={() => apply(true, true)}
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => apply(false, false)}
                aria-label="Reject non-essential cookies"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShowPreferences(true)}
                aria-label="Manage cookie preferences"
              >
                Manage Preferences
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* ---- Footer link to reopen settings ---- */}
      {hasConsentState && !showBanner && (
        <button
          type="button"
          className="cookie-settings-trigger"
          onClick={() => setShowPreferences(true)}
          aria-label="Open cookie preferences"
        >
          Cookie Settings
        </button>
      )}

      {/* ---- Preferences Dialog ---- */}
      <Dialog
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        title="Cookie Preferences"
      >
        <p style={{ margin: 0 }}>
          This interface relies on local storage rather than third-party
          cookies. Your preferences are stored locally and never leave this
          device.
        </p>

        <div role="group" aria-label="Cookie categories">
          <CategoryToggle
            label="Essential cookies"
            description="Strictly required for the interface to function -- consent state, navigation preferences."
            checked={true}
            disabled
          />
          <CategoryToggle
            label="Functional cookies"
            description="Remember your interface preferences -- such as cookie preference choices."
            checked={functional}
            onChange={setFunctional}
          />
          <CategoryToggle
            label="Performance cookies"
            description="None are enabled by default. Nothing is collected or transmitted."
            checked={performance}
            onChange={setPerformance}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-6)',
            paddingTop: 'var(--space-4)',
            borderTop: '1px solid var(--line)',
          }}
        >
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowPreferences(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-gold"
            onClick={() => apply(functional, performance)}
          >
            Save Preferences
          </button>
        </div>
      </Dialog>
    </>
  );
}
