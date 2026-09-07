'use client';

/**
 * RONIN HQ — Access Page
 *
 * Presents tier cards with artwork, feature lists, and pricing.
 * Includes Founding Circle counter and hero artwork.
 */

import Image from 'next/image';
import { ARTWORK } from '@/lib/artwork';
import { useToast } from '@/lib/toast';
import { StatusPill } from '@/components/ui/StatusPill';
import { TierArtworkCard } from '@/components/access/TierArtworkCard';

/* ------------------------------------------------------------
   Tier Data
   ------------------------------------------------------------ */

const FOUNDING_SPOTS = 47;
const FOUNDING_TOTAL = 50;

interface TierConfig {
  tierName: string;
  price: string;
  image: 'tier-open-circle' | 'tier-vanguard' | 'tier-warden' | 'tier-shogun';
  accentColor: string;
  features: string[];
  limitations?: string[];
  highlighted?: boolean;
}

const TIERS: TierConfig[] = [
  {
    tierName: 'Open Circle',
    price: 'Free',
    image: 'tier-open-circle',
    accentColor: '#706B63',
    features: [
      'Community intelligence feed',
      'Daily regime summary',
      'Illustrative signal previews',
      'Public research digest',
      'Basic education modules',
    ],
    limitations: [
      'No direct Telegram alerts',
      'No wallet intelligence',
      'No priority predictions',
    ],
  },
  {
    tierName: 'Vanguard',
    price: '$79',
    image: 'tier-vanguard',
    accentColor: '#0EA5E9',
    features: [
      'Everything in Open Circle',
      'Telegram signal delivery',
      'Up to 5 tracked wallets',
      'Weekly prediction receipts',
      'Regime change alerts',
      'Sector heatmaps',
    ],
    limitations: [
      'No priority queue',
      'No custom alerts',
    ],
  },
  {
    tierName: 'Warden',
    price: '$199',
    image: 'tier-warden',
    accentColor: '#C59A57',
    features: [
      'Everything in Vanguard',
      'Up to 20 tracked wallets',
      'Priority signal queue',
      'Custom alert rules',
      'In-depth research briefs',
      'Early prediction access',
      'Dedicated intelligence feed',
    ],
    limitations: [
      'No direct consultation',
    ],
  },
  {
    tierName: 'Shogun',
    price: '$499',
    image: 'tier-shogun',
    accentColor: '#C51E29',
    features: [
      'Everything in Warden',
      'Unlimited tracked wallets',
      'Real-time whale alerts',
      'Full research archive',
      'Beta feature early access',
      'Priority support channel',
      'Quarterly strategy review',
      'Founding Circle status',
    ],
    highlighted: true,
  },
];

/* ------------------------------------------------------------
   Page Component
   ------------------------------------------------------------ */

export default function AccessPage() {
  const { addToast } = useToast();
  const heroArt = ARTWORK['hero-gold-tomorrow'];

  const handleSelect = (tierName: string) => {
    addToast(`${tierName} selection recorded. Illustrative demo only.`, 'info');
  };

  return (
    <div className="page-root">
      {/* ---- Hero ---- */}
      <section className="access-hero" aria-label="Intelligence access hero">
        {heroArt && (
          <Image
            src={heroArt.src}
            alt={heroArt.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className="access-hero-overlay" aria-hidden="true" />
        <div className="access-hero-content">
          <span className="section-kicker">Intelligence Access</span>
          <h1
            className="display-md"
            style={{ color: 'var(--bone)', marginTop: 'var(--space-2)' }}
          >
            Intelligence Access
          </h1>
          <p className="access-hero-subtitle">
            Illustrative membership tiers for the RONIN intelligence
            interface. Each tier is designed for a different depth of
            research engagement and signal delivery.
          </p>
        </div>
      </section>

      {/* ---- Founding Circle ---- */}
      <section
        className="access-founding"
        aria-label="Founding Circle"
      >
        <div className="access-founding-title">Founding Circle</div>
        <div className="access-founding-counter">
          {FOUNDING_SPOTS}/{FOUNDING_TOTAL}
        </div>
        <StatusPill variant="gold">Founding</StatusPill>
        <p className="access-founding-note">
          Illustrative founding spots available. Early founding members
          receive lifetime status and priority access to new features as
          they are developed.
        </p>
      </section>

      {/* ---- Tier Grid ---- */}
      <section aria-label="Membership tiers">
        <div className="tier-grid">
          {TIERS.map((tier) => (
            <TierArtworkCard
              key={tier.tierName}
              tierName={tier.tierName}
              price={tier.price}
              image={tier.image}
              accentColor={tier.accentColor}
              features={tier.features}
              limitations={tier.limitations}
              highlighted={tier.highlighted}
              onSelect={() => handleSelect(tier.tierName)}
              note={
                tier.tierName === 'Warden'
                  ? 'Most popular tier for serious on-chain researchers.'
                  : undefined
              }
            />
          ))}
        </div>
      </section>

      {/* ---- Pricing Philosophy ---- */}
      <section className="access-philosophy" aria-label="Pricing philosophy">
        <p>
          All pricing is illustrative and for demonstration purposes only.
          RONIN does not process payments. Features, pricing, and tier
          structure shown here represent a conceptual product design and do
          not constitute an offer to sell or a guarantee of future
          availability.
        </p>
      </section>
    </div>
  );
}
