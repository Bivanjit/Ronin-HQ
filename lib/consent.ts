/**
 * RONIN HQ — Cookie Consent State Management
 *
 * Persists consent preferences to localStorage.
 * Essential cookies are always true; functional and performance default to false.
 */

const CONSENT_KEY = 'ronin-hq:consent';

export interface ConsentState {
  essential: true;
  functional: boolean;
  performance: boolean;
}

const DEFAULT_STATE: ConsentState = {
  essential: true,
  functional: false,
  performance: false,
};

/**
 * Load consent state from localStorage.
 * Returns the default state if nothing is stored or if parsing fails.
 */
export function loadConsent(): ConsentState {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_STATE };
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return { ...DEFAULT_STATE };

    const parsed = JSON.parse(raw);

    return {
      essential: true,
      functional: Boolean(parsed.functional),
      performance: Boolean(parsed.performance),
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

/**
 * Persist consent state to localStorage.
 * Always forces essential: true regardless of input.
 */
export function saveConsent(state: ConsentState): void {
  if (typeof window === 'undefined') return;

  const normalized: ConsentState = {
    essential: true,
    functional: Boolean(state.functional),
    performance: Boolean(state.performance),
  };

  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(normalized));
  } catch {
    // localStorage may be unavailable or full — fail silently
  }
}

/**
 * Check whether the user has made an explicit consent choice.
 * Returns false if no consent record exists yet.
 */
export function hasConsented(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    return window.localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return false;
  }
}
