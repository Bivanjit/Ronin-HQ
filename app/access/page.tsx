'use client';

import Image from 'next/image';
import { ARTWORK } from '@/lib/artwork';
import { StatusPill } from '@/components/ui/StatusPill';
import { TierArtworkCard } from '@/components/access/TierArtworkCard';

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
    accentColor: '#34ff72',
    features: ['Community intelligence feed', 'Daily regime summary', 'Public research digest', 'Basic education modules'],
    limitations: ['No direct Telegram alerts', 'No priority predictions'],
  },
  {
    tierName: 'Vanguard',
    price: '$79',
    image: 'tier-vanguard',
    accentColor: '#d7e0e7',
    features: ['24/7 intelligence coverage', 'Faster candidate processing', 'Stronger verification', 'Detailed prediction receipts', 'Priority alerts'],
    limitations: ['Lower priority than Warden and Shogun'],
  },
  {
    tierName: 'Warden',
    price: '$199',
    image: 'tier-warden',
    accentColor: '#ffc94d',
    features: ['24/7 deep intelligence', 'Deeper verification', 'Model competition', 'Continuous ranking', 'Wallet intelligence', 'Failure analysis'],
    highlighted: true,
  },
  {
    tierName: 'Shogun',
    price: '$499',
    image: 'tier-shogun',
    accentColor: '#ff3344',
    features: ['Maximum priority', 'Deepest verification', 'Maximum analysis depth', 'Independent validation', 'Highest alert priority', 'Strongest verified opportunities'],
    highlighted: true,
  },
];

export default function AccessPage() {
  const heroArt = ARTWORK['hero-gold-tomorrow'];

  return (
    <div className="page-root">
      <section className="access-hero" aria-label="Intelligence access hero">
        {heroArt && (
          <Image src={heroArt.src} alt={heroArt.alt} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        )}
        <div className="access-hero-overlay" aria-hidden="true" />
        <div className="access-hero-content">
          <span className="section-kicker">INTELLIGENCE ACCESS</span>
          <h1 className="display-md" style={{ color: 'var(--bone)', marginTop: 'var(--space-2)' }}>Choose Your Path</h1>
          <p className="access-hero-subtitle">Different levels. One mission. Intelligence before the crowd.</p>
        </div>
      </section>

      <section className="access-founding" aria-label="Founding Circle">
        <div className="access-founding-title">FOUNDING ACCESS</div>
        <div className="access-founding-counter">{FOUNDING_SPOTS}/{FOUNDING_TOTAL}</div>
        <StatusPill variant="gold">FOUNDING</StatusPill>
        <p className="access-founding-note">First 50 members are free. After the founding circle is filled, Open Circle access is $1 one-time.</p>
      </section>

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
              onSelect={() => {
                window.location.href = '/#join';
              }}
            />
          ))}
        </div>
      </section>

      <section className="access-philosophy" aria-label="Pricing philosophy">
        <p>Higher tiers provide greater coverage, compute priority, verification depth, context and alert priority. RONIN does not guarantee returns or outcomes.</p>
      </section>
    </div>
  );
}
