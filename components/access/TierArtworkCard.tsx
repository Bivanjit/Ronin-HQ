/**
 * RONIN HQ — Tier Artwork Card
 *
 * Premium tier card with artwork, feature list, accent color glow,
 * and metallic surface overlay. Used on the Access page.
 */

import Image from 'next/image';
import { ARTWORK, type ArtworkKey } from '@/lib/artwork';

/* ------------------------------------------------------------
   Types
   ------------------------------------------------------------ */

export interface TierArtworkCardProps {
  tierName: string;
  price: string;
  image: ArtworkKey;
  accentColor: string;
  features: string[];
  limitations?: string[];
  highlighted?: boolean;
  onSelect?: () => void;
  note?: string;
}

/* ------------------------------------------------------------
   Component
   ------------------------------------------------------------ */

export function TierArtworkCard({
  tierName,
  price,
  image,
  accentColor,
  features,
  limitations,
  highlighted = false,
  onSelect,
  note,
}: TierArtworkCardProps) {
  const artwork = ARTWORK[image];
  if (!artwork) return null;

  const cardClasses = [
    'tier-card',
    highlighted ? 'tier-card--featured' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={cardClasses}
      style={{ '--tier-accent': accentColor } as React.CSSProperties}
    >
      {/* Artwork image */}
      <div className="tier-card-image">
        <Image
          src={artwork.src}
          alt={artwork.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="tier-card-image-overlay" aria-hidden="true" />
      </div>

      {/* Card body */}
      <div className="tier-card-body">
        <h3 className="tier-card-title">{tierName}</h3>
        <div className="tier-card-price">
          <strong>{price}</strong>
          {price !== 'Free' && '/mo'}
        </div>

        {/* Features */}
        <ul className="tier-features" role="list">
          {features.map((feature) => (
            <li key={feature} className="tier-feature">
              <svg
                className="tier-feature-check"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M11.5 3.5L5.5 10.5L2.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Limitations */}
        {limitations && limitations.length > 0 && (
          <div className="tier-limits" role="list" aria-label="Limitations">
            {limitations.map((item) => (
              <div key={item} className="tier-limit" role="listitem">
                {item}
              </div>
            ))}
          </div>
        )}

        {/* Optional note */}
        {note && <div className="tier-card-note">{note}</div>}
      </div>

      {/* CTA footer */}
      <div className="tier-card-footer">
        <button
          type="button"
          className="tier-cta"
          onClick={onSelect}
          aria-label={`Select ${tierName} tier`}
        >
          {price === 'Free' ? 'Join Free' : `Select ${tierName}`}
        </button>
      </div>
    </article>
  );
}
