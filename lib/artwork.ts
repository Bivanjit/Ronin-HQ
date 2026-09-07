/**
 * RONIN HQ — Artwork Map
 */
export interface ArtworkEntry { src: string; alt: string; role: string; }
export const ARTWORK_KEYS = ['ronin-official','ronin-official-alt','ronin-hq-identity','ronin-red-identity','ronin-intelligence-mark','ronin-market-intelligence','ronin-gold-seal','ronin-gold-discipline','ronin-gold-compact','hero-red-wide','hero-red-perspective','hero-gold-features','hero-gold-community','hero-gold-tomorrow','tier-open-circle','tier-vanguard','tier-warden','tier-shogun'] as const;
export type ArtworkKey = (typeof ARTWORK_KEYS)[number];
export const ARTWORK: Record<ArtworkKey, ArtworkEntry> = {
  'ronin-official': { src:'/art/ronin-official.png', alt:'RONIN official mark', role:'Primary brand mark' },
  'ronin-official-alt': { src:'/art/ronin-official-alt.png', alt:'RONIN official mark alternate', role:'Alternate brand mark' },
  'ronin-hq-identity': { src:'/art/ronin-hq-identity.png', alt:'RONIN HQ identity illustration', role:'HQ identity' },
  'ronin-red-identity': { src:'/art/ronin-red-identity.png', alt:'RONIN red identity mark', role:'Red identity' },
  'ronin-intelligence-mark': { src:'/art/ronin-intelligence-mark.png', alt:'RONIN intelligence mark', role:'Intelligence mark' },
  'ronin-market-intelligence': { src:'/art/ronin-market-intelligence.png', alt:'RONIN market intelligence illustration', role:'Market intelligence visual' },
  'ronin-gold-seal': { src:'/art/ronin-gold-seal.png', alt:'RONIN gold seal', role:'Gold seal' },
  'ronin-gold-discipline': { src:'/art/ronin-gold-discipline.png', alt:'RONIN gold discipline emblem', role:'Methodology visual' },
  'ronin-gold-compact': { src:'/art/ronin-gold-compact.jpg', alt:'RONIN gold compact emblem', role:'Compact emblem' },
  'hero-red-wide': { src:'/art/hero-red-wide.png', alt:'RONIN wide hero in vermilion', role:'Primary hero banner' },
  'hero-red-perspective': { src:'/art/hero-red-perspective.png', alt:'RONIN perspective hero in red', role:'Red perspective visual' },
  'hero-gold-features': { src:'/art/hero-gold-features.png', alt:'RONIN features hero in gold', role:'Features visual' },
  'hero-gold-community': { src:'/art/hero-gold-community.png', alt:'RONIN community hero in gold', role:'Community visual' },
  'hero-gold-tomorrow': { src:'/art/hero-gold-tomorrow.png', alt:'RONIN future vision hero in gold', role:'Future visual' },
  'tier-open-circle': { src:'/art/reference-open-circle.webp', alt:'RONIN Open Circle supplied screenshot crop', role:'Supplied visual reference crop for Open Circle' },
  'tier-vanguard': { src:'/art/tier-vanguard.png', alt:'RONIN Vanguard tier artwork', role:'Vanguard tier artwork' },
  'tier-warden': { src:'/art/tier-warden.png', alt:'RONIN Warden tier artwork', role:'Warden tier artwork' },
  'tier-shogun': { src:'/art/tier-shogun.png', alt:'RONIN Shogun tier artwork', role:'Shogun tier artwork' },
};
export function getArtwork(key: ArtworkKey): ArtworkEntry | undefined { return ARTWORK[key]; }
