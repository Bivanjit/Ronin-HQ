import Image from 'next/image';
import { ARTWORK } from '@/lib/artwork';
import { StatusPill } from '@/components/ui/StatusPill';

const SECURITY_GROUND_RULES = [
  'Never share your private keys, seed phrase, or recovery passphrase with anyone.',
  'No legitimate service — including RONIN HQ — will ever ask for your keys.',
  'Store keys offline. Use a hardware wallet for anything of material value.',
  'Treat any unsolicited message as a threat until verified through an official channel.',
] as const;

const IMPERSONATION_WARNING = [
  'Scammers impersonate brands using lookalike domains, channels, and accounts.',
  'Always confirm a profile is the verified, official account before trusting it.',
  'Do not move funds based on a direct message, screen recording, or "admin" from a private chat.',
  'Official teams communicate on their own verified accounts — not by DM.',
] as const;

const EXTERNAL_LINKS = [
  'Check the URL carefully — typos and homoglyphs are common impersonation tricks.',
  'Prefer bookmarking official pages instead of following links from messages.',
  'If downloadable software is involved, verify checksums and signatures.',
  'Never enter a seed phrase or private key into any website, walletconnect modal, or form.',
] as const;

const VERIFICATION_CHANNEL = [
  'Bookmark the official RONIN HQ site and cross-reference its verified social accounts.',
  'Verify the account handle is exact — extra dots, dashes, or numbers are red flags.',
  'Search the official documentation for any channel before treating it as trusted.',
  'When in doubt, take no action. Legitimate support can wait.',
] as const;

export default function SafetyPage() {
  const mark = ARTWORK['ronin-intelligence-mark'];

  return (
    <div className="page-root">
      {/* Header strip */}
      <div className="research-hero" style={{ position: 'relative' }}>
        <Image
          src={mark.src}
          alt={mark.alt}
          fill
          priority
          sizes="(max-width: 1240px) 100vw, 1200px"
          style={{ objectFit: 'cover' }}
        />
        <div className="research-hero__overlay" aria-hidden="true" />
        <div className="research-hero__inner">
          <h1 className="display-lg">Safety & Security</h1>
          <p className="body-lg text-secondary" style={{ maxWidth: 640 }}>
            Research positions you behind the lens — never on the chain. Staying
            safe means keeping your keys private and your trust in official
            channels only.
          </p>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <StatusPill variant="gold">Research Only</StatusPill>
          </div>
        </div>
      </div>

      {/* Prominent commitment */}
      <section className="page-section" aria-labelledby="commitment-title">
        <div className="notice-banner">
          <p className="display-md" id="commitment-title">
            RONIN will never request your seed phrase or private keys.
          </p>
          <p className="body-md text-secondary" style={{ maxWidth: 720 }}>
            Anyone who does — in any channel, under any name — is an impostor.
            RONIN HQ is a research and analysis interface. It has no access to
            your funds, no ability to move assets, and no reason to ever ask
            for your secrets.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security hygiene */}
        <section className="card safety-card" aria-labelledby="hygiene-title">
          <div className="card-header">
            <h2 id="hygiene-title" className="heading-sm">
              Security Hygiene
            </h2>
            <StatusPill variant="risk-low">Foundations</StatusPill>
          </div>
          <ul className="guideline-list check-list" style={{ padding: 0 }}>
            {SECURITY_GROUND_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>

        {/* Impersonation protection */}
        <section className="card safety-card" aria-labelledby="impersonation-title">
          <div className="card-header">
            <h2 id="impersonation-title" className="heading-sm">
              Impersonation Protection
            </h2>
            <StatusPill variant="risk-high">Threat</StatusPill>
          </div>
          <ul
            className="guideline-list guideline-list--vermilion check-list"
            style={{ padding: 0 }}
          >
            {IMPERSONATION_WARNING.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>

        {/* External link safety */}
        <section className="card safety-card" aria-labelledby="links-title">
          <div className="card-header">
            <h2 id="links-title" className="heading-sm">
              External Link Safety
            </h2>
            <StatusPill variant="neutral">Verify</StatusPill>
          </div>
          <ul
            className="guideline-list guideline-list--cyan check-list"
            style={{ padding: 0 }}
          >
            {EXTERNAL_LINKS.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>

        {/* Verification of official channels */}
        <section className="card safety-card" aria-labelledby="verify-title">
          <div className="card-header">
            <h2 id="verify-title" className="heading-sm">
              Verify Official Channels
            </h2>
            <StatusPill variant="gold">Authentic</StatusPill>
          </div>
          <ul className="guideline-list check-list" style={{ padding: 0 }}>
            {VERIFICATION_CHANNEL.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Wallet safety guidelines */}
      <section className="page-section" aria-labelledby="wallet-title">
        <div className="section-header-row">
          <div>
            <p className="section-kicker">Wallet Safety</p>
            <h2 id="wallet-title" className="display-md">
              Guidelines for Wallet Hygiene
            </h2>
          </div>
          <StatusPill variant="risk-low">Research Positioning</StatusPill>
        </div>

        <div className="card">
          <ul className="guideline-list check-list" style={{ padding: 0 }}>
            <li>
              Use a dedicated research wallet with a small balance for any
              on-chain experiments — never a primary wallet.
            </li>
            <li>
              Revoke token approvals you no longer use; stale approvals are the
              most common drain vector.
            </li>
            <li>
              Enable additional protection on anything that holds value:
              hardware wallet, passphrase, or whitelist.
            </li>
            <li>
              Verify contract addresses against official sources before any
              interaction, even on trusted front-ends.
            </li>
            <li>
              RONIN HQ only ever reads public chain data. It will never ask you
              to connect a wallet, sign a transaction, or provide a key.
            </li>
          </ul>
        </div>
      </section>

      {/* Research-only positioning */}
      <div className="notice-banner" role="note">
        <p className="body-sm">
          <strong>Research-only positioning.</strong> RONIN HQ is an
          observational intelligence interface. It provides no wallet
          connection, no transaction signing, and no custodial services. All
          data shown is illustrative and synthetic; nothing here is financial
          advice, and no outcome is guaranteed.
        </p>
      </div>
    </div>
  );
}