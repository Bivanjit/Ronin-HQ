import Image from 'next/image';
import Link from 'next/link';
import { ARTWORK } from '@/lib/artwork';

const TIERS = [
  { key: 'open', name: 'Open Circle', price: '$0', cadence: '/ month', image: 'tier-open-circle', desc: 'Discuss · Learn · Share · Grow', href: '/access', cta: 'Join Free' },
  { key: 'vanguard', name: 'Vanguard', price: '$79', cadence: '/ month', image: 'tier-vanguard', desc: 'Early insights. Real edge.', href: '/access', cta: 'Learn More' },
  { key: 'warden', name: 'Warden', price: '$199', cadence: '/ month', image: 'tier-warden', desc: 'Deeper data. Higher conviction.', href: '/access', cta: 'Learn More' },
  { key: 'shogun', name: 'Shogun', price: '$499', cadence: '/ month', image: 'tier-shogun', desc: 'The highest tier.', href: '/access', cta: 'Learn More' },
] as const;

const OPPORTUNITIES = [
  ['01', 'SOL', '+12.4%', 'HIGH'],
  ['02', 'POPCAT', '+8.7%', 'EXTREME'],
  ['03', 'WIF', '+6.2%', 'HIGH'],
  ['04', 'BONK', '+5.1%', 'MEDIUM'],
  ['05', 'JUP', '+4.8%', 'HIGH'],
] as const;

const LEDGER = [
  ['RN-2024-001847', 'SOL', 'LONG', '78%', '+12.4%', '300s', 'ACTIVE'],
  ['RN-2024-001846', 'POPCAT', 'LONG', '72%', '+8.7%', '300s', 'ACTIVE'],
  ['RN-2024-001845', 'WIF', 'SHORT', '68%', '+6.2%', '900s', 'EXPIRED'],
  ['RN-2024-001844', 'BONK', 'LONG', '71%', '+9.1%', '300s', 'RESOLVED'],
  ['RN-2024-001843', 'JUP', 'LONG', '69%', '+7.6%', '900s', 'RESOLVED'],
] as const;

export default function HomePage() {
  return (
    <div className="page-root">
      <section className="hero section" aria-labelledby="hero-title">
        <div className="hero__media">
          <Image className="hero__image" src={ARTWORK['hero-red-wide'].src} alt="RONIN samurai beneath a red moon" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__inner">
          <p className="hero__eyebrow">RONIN // ALPHA INTELLIGENCE</p>
          <h1 id="hero-title" className="hero__title">Intelligence <span className="accent">Before the Crowd_</span></h1>
          <p className="hero__tagline">Real-time on-chain intelligence.<br />Early opportunities. Unfair advantage.<br />Built for the few who see ahead.</p>
          <div className="ronin-cta-row">
            <Link className="ronin-cta" href="/access">Join Ronin <span aria-hidden="true">→</span></Link>
            <Link className="ronin-cta secondary" href="/terminal">◉ &nbsp; Watch Intro</Link>
          </div>
          <div className="hero__signals">
            <div><b>REAL-TIME</b><span>On-Chain Data</span></div>
            <div><b>AI-POWERED</b><span>Signal Engine</span></div>
            <div><b>EXCLUSIVE</b><span>Curated Alpha</span></div>
            <div><b>GLOBAL</b><span>Ronin Community</span></div>
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="tiers-title">
        <div className="section-header-row">
          <div><p className="section-kicker">Access Levels</p><h2 id="tiers-title" className="display-md">Choose Your Path</h2></div>
          <p className="body-sm text-secondary">Different roads. One mission. A higher perspective.</p>
        </div>
        <div className="tier-grid">
          {TIERS.map((tier) => (
            <article key={tier.name} className={`tier-card ${tier.key}`}>
              <Image src={ARTWORK[tier.image].src} alt={`${tier.name} Ronin tier`} fill sizes="(max-width: 600px) 100vw, 25vw" style={{ objectFit: 'cover' }} />
              <div className="tier-card__body">
                <h3>{tier.name}</h3>
                <p>{tier.desc}</p>
                <div style={{ marginTop: 10, fontWeight: 800 }}>{tier.price} <small style={{ fontWeight: 500 }}>{tier.cadence}</small></div>
                <Link className="mini-cta" href={tier.href}> {tier.cta} → </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section edge-section" aria-labelledby="edge-title">
        <div className="edge-copy">
          <p className="section-kicker">More Than Signals</p>
          <h2 id="edge-title">A Higher <span>Standard.</span></h2>
          <p>Ronin is a community, a research engine, and a mindset. We combine real-time on-chain data, advanced analytics, and disciplined execution to surface opportunities before the crowd.</p>
          <div className="ronin-cta-row"><Link className="ronin-cta gold" href="/research">Our Philosophy →</Link></div>
          <div className="edge-grid">
            <div className="edge-item"><strong>◎ Real-Time</strong><span>On-Chain Monitoring</span></div>
            <div className="edge-item"><strong>◈ AI-Powered</strong><span>Signal Detection</span></div>
            <div className="edge-item"><strong>◇ Exclusive</strong><span>Curated Opportunities</span></div>
            <div className="edge-item"><strong>◎ Global</strong><span>Like-Minded Community</span></div>
          </div>
        </div>
        <div className="edge-art"><Image src={ARTWORK['hero-gold-community'].src} alt="RONIN discipline and freedom artwork" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} /></div>
      </section>

      <section className="page-section" aria-labelledby="terminal-preview-title">
        <div className="terminal-preview">
          <div className="terminal-head">
            <div><p className="section-kicker">Real-Time On-Chain Analytics</p><h2 id="terminal-preview-title" className="terminal-title">Live Market Intelligence</h2><p className="terminal-sub">Intelligence Terminal // illustrative interface</p></div>
            <Link className="ronin-cta" href="/terminal">Open Terminal →</Link>
          </div>
          <div className="terminal-metrics">
            <div className="terminal-metric"><small>SOL/USDC</small><b>$142.37</b><em className="up">+12.4%</em></div>
            <div className="terminal-metric"><small>24h Volume</small><b>$89.3B</b><em className="up">+12.4%</em></div>
            <div className="terminal-metric"><small>Market Cap</small><b>$66.8B</b><em className="up">+3.2%</em></div>
            <div className="terminal-metric"><small>Active Tokens</small><b>12,847</b><em className="up">+3.2%</em></div>
            <div className="terminal-metric"><small>Market Regime</small><b>BULLISH</b><em className="up">Strong Momentum</em></div>
          </div>
          <div className="terminal-body">
            <div className="chart-box"><h4>SOL/USDC · 1m · 5m · 15m · 1h · 4h · 1d</h4><div className="fake-chart" aria-hidden="true" /></div>
            <div className="opportunity-box"><h4>Top Opportunities</h4>{OPPORTUNITIES.map(([n,asset,change,grade])=><div className="opp-row" key={asset}><span>{n}</span><b>{asset}</b><span className="up">{change}</span><span className="signal-chip up">{grade}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section className="page-section" aria-labelledby="ledger-title">
        <div className="ledger-preview">
          <div className="ledger-top"><div><p className="section-kicker">Every Prediction Leaves a Receipt.</p><h2 id="ledger-title" className="display-md">Prediction Ledger</h2></div><Link className="ronin-cta" href="/predictions">View Ledger →</Link></div>
          <table className="ledger-table"><thead><tr><th>ID</th><th>Asset</th><th>Direction</th><th>Probability</th><th>Expected Return</th><th>Horizon</th><th>Status</th></tr></thead><tbody>{LEDGER.map((row)=><tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td className={row[2]==='LONG'?'up':'down'}>{row[2]}</td><td>{row[3]}</td><td className="up">{row[4]}</td><td>{row[5]}</td><td><span className={`status ${row[6].toLowerCase()}`}>{row[6]}</span></td></tr>)}</tbody></table>
        </div>
      </section>

      <section className="page-section" aria-labelledby="philosophy-title">
        <div className="edge-section">
          <div className="edge-copy"><p className="section-kicker">Our Methodology</p><h2 id="philosophy-title">Data Over <span>Hype.</span></h2><p>SCAN. DISCOVER. QUALIFY. UNDERSTAND. VERIFY. PREDICT. RECORD. TRACK. RESOLVE. EVALUATE. LEARN. ADAPT.</p><div className="ronin-cta-row"><Link className="ronin-cta gold" href="/research">Explore Methodology →</Link></div><div className="social-strip"><a className="social-link" href="https://github.com/Bivanjit/ronin-hq" target="_blank" rel="noreferrer">GitHub ↗</a><Link className="social-link" href="/research#contact">Community</Link><Link className="social-link" href="/research#contact">Contact</Link></div></div>
          <div className="edge-art"><Image src={ARTWORK['ronin-gold-discipline'].src} alt="RONIN discipline fuels freedom artwork" fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} /></div>
        </div>
      </section>

      <p className="home-disclaimer">Not financial advice. High risk. Do your own research. Data over hype. Evidence over promises.</p>
    </div>
  );
}
