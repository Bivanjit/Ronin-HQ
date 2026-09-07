/**
 * RONIN HQ — Artwork Map
 *
 * Central registry of all image assets used across the application.
 * Every entry carries src, alt, and a role description for semantic use.
 */

export interface ArtworkEntry {
  src: string;
  alt: string;
  role: string;
}

export const ARTWORK_KEYS = [
  'ronin-official',
  'ronin-official-alt',
  'ronin-hq-identity',
  'ronin-red-identity',
  'ronin-intelligence-mark',
  'ronin-market-intelligence',
  'ronin-gold-seal',
  'ronin-gold-discipline',
  'ronin-gold-compact',
  'hero-red-wide',
  'hero-red-perspective',
  'hero-gold-features',
  'hero-gold-community',
  'hero-gold-tomorrow',
  'tier-open-circle',
  'tier-vanguard',
  'tier-warden',
  'tier-shogun',
] as const;

export type ArtworkKey = (typeof ARTWORK_KEYS)[number];

export const ARTWORK: Record<ArtworkKey, ArtworkEntry> = {
  'ronin-official': {
    src: '/art/ronin-official.png',
    alt: 'RONIN official mark',
    role: 'Primary brand mark for header and identity usage',
  },
  'ronin-official-alt': {
    src: '/art/ronin-official-alt.png',
    alt: 'RONIN official mark alternate',
    role: 'Alternate brand mark for dark-on-light contexts',
  },
  'ronin-hq-identity': {
    src: '/art/ronin-hq-identity.png',
    alt: 'RONIN HQ identity illustration',
    role: 'Full HQ identity lockup for landing and about sections',
  },
  'ronin-red-identity': {
    src: '/art/ronin-red-identity.png',
    alt: 'RONIN red identity mark',
    role: 'Vermilion-themed identity for emphasis contexts',
  },
  'ronin-intelligence-mark': {
    src: '/art/ronin-intelligence-mark.png',
    alt: 'RONIN intelligence mark',
    role: 'Intelligence module branding mark',
  },
  'ronin-market-intelligence': {
    src: '/art/ronin-market-intelligence.png',
    alt: 'RONIN market intelligence illustration',
    role: 'Market intelligence dashboard hero illustration',
  },
  'ronin-gold-seal': {
    src: '/art/ronin-gold-seal.png',
    alt: 'RONIN gold seal',
    role: 'Gold-tier membership seal for tier display',
  },
  'ronin-gold-discipline': {
    src: '/art/ronin-gold-discipline.png',
    alt: 'RONIN gold discipline emblem',
    role: 'Discipline and methodology visual for methodology section',
  },
  'ronin-gold-compact': {
    src: '/art/ronin-gold-compact.jpg',
    alt: 'RONIN gold compact emblem',
    role: 'Compact gold emblem for tight layouts and badges',
  },
  'hero-red-wide': {
    src: '/art/hero-red-wide.png',
    alt: 'RONIN wide hero in vermilion',
    role: 'Full-width hero banner for primary landing experience',
  },
  'hero-red-perspective': {
    src: '/art/hero-red-perspective.png',
    alt: 'RONIN perspective hero in red',
    role: 'Perspective hero for depth effect on secondary pages',
  },
  'hero-gold-features': {
    src: '/art/hero-gold-features.png',
    alt: 'RONIN features hero in gold',
    role: 'Features section hero for product showcase',
  },
  'hero-gold-community': {
    src: '/art/hero-gold-community.png',
    alt: 'RONIN community hero in gold',
    role: 'Community section hero for social proof areas',
  },
  'hero-gold-tomorrow': {
    src: '/art/hero-gold-tomorrow.png',
    alt: 'RONIN future vision hero in gold',
    role: 'Future vision hero for roadmap and forward-looking content',
  },
  'tier-open-circle': {
    src: '/art/tier-open-circle.png',
    alt: 'RONIN Open Circle tier badge',
    role: 'Tier badge for Open Circle access level',
  },
  'tier-vanguard': {
    src: '/art/tier-vanguard.png',
    alt: 'RONIN Vanguard tier badge',
    role: 'Tier badge for Vanguard access level',
  },
  'tier-warden': {
    src: '/art/tier-warden.png',
    alt: 'RONIN Warden tier badge',
    role: 'Tier badge for Warden access level',
  },
  'tier-shogun': {
    src: '/art/tier-shogun.png',
    alt: 'RONIN Shogun tier badge',
    role: 'Tier badge for Shogun access level',
  },
};

/**
 * Retrieve an artwork entry by key.
 * Returns undefined if the key does not exist (safe for optional rendering).
 */
export function getArtwork(key: ArtworkKey): ArtworkEntry | undefined {
  return ARTWORK[key];
}
