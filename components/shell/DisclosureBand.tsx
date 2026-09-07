'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ronin-disclosure-dismissed';

export default function DisclosureBand() {
  const [dismissed, setDismissed] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value !== 'true') {
        setDismissed(false);
      }
    } catch {
      // localStorage unavailable - show the band as safe default
      setDismissed(false);
    }
    setHydrated(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // localStorage unavailable
    }
  }, []);

  // Render nothing until hydrated to prevent flash, or if dismissed
  if (!hydrated || dismissed) return null;

  return (
    <div className="disclosure-band" role="status" aria-live="polite">
      <p className="disclosure-band__text">
        This interface displays illustrative demonstration data. It does not
        represent live market conditions or guaranteed outcomes.
      </p>
      <button
        className="disclosure-band__dismiss"
        onClick={handleDismiss}
        aria-label="Dismiss disclosure notice"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 3L3 9M3 3l6 6"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
