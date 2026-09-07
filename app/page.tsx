'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ARTWORK } from '@/lib/artwork';

const TIERS = [
  { name: 'Open Circle', price: '$0', cadence: 'forever', tone: 'green', image: 'tier-open-circle', points: ['Community access', 'Ronin philosophy & research', 'Public announcements', 'No fabricated signals'], cta: 'Join Free' },
  { name: 'Vanguard', price: '$79', cadence: '/ month', tone: 'silver', image: 'tier-vanguard', points: ['24/7 intelligence access', 'Faster processing', 'Stronger verification', 'Priority alerts', 'Detailed intelligence receipts'], cta: 'Enter Vanguard' },
  { name: 'Warden', price: '$199', cadence: '/ month', tone: 'gold', image: 'tier-warden', points: ['Everything in Vanguard', 'Deep intelligence', 'Advanced wallet intelligence', 'Continuous ranking', 'Deeper verification'], cta: 'Enter Warden' },
  { name: 'Shogun', price: '$499', cadence: '/ month', tone: 'red', image: 'tier-shogun', points: ['Everything in Warden', 'Maximum priority', 'Deepest verification', 'Independent validation', 'Strongest available intelligence'], cta: 'Enter Shogun' },
] as const;

const FAQ = [
  ['What is RONIN?', 'RONIN is an on-chain intelligence platform built around disciplined research, verification, and early opportunity discovery. The website explains the system and access levels. Detailed intelligence is delivered through Telegram.'],
  ['Where do I receive intelligence?', 'The public site is the front door. RONIN intelligence and community updates are delivered through the Telegram experience tied to your access level.'],
  ['Are predictions or signals shown on this website?', 'No. This site intentionally does not publish live predictions, prediction receipts, market calls, or performance claims. The website explains what RONIN is. Telegram is where the intelligence experience lives.'],
  ['What does each tier change?', 'Higher tiers increase access, monitoring coverage, processing priority, verification depth, context, and intelligence depth. They do not buy guaranteed returns.'],
  ['How does founding access work?', 'The first 50 Open Circle members receive founding access free. After the first 50, Open Circle uses a one-time $1 joining fee. There is no monthly fee for Open Circle.'],
  ['Is RONIN financial advice?', 'No. Crypto markets are highly risky. RONIN is an intelligence and research service, not a promise of profit or a substitute for your own judgment.'],
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="ronin-site">
      <header className="site-header">
        <div className="nav-wrap">
          <Link href="#top" className="brand" onClick={closeMenu} aria-label="RONIN home">
            <Image src={ARTWORK['ronin-official'].src} alt="RONIN" width={118} height={42} priority className="brand-logo" />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#intelligence">Intelligence</a>
            <a href="#tiers">Tiers</a>
            <a href="#method">Method</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <Link href="#contact" className="nav-login">Access</Link>
            <Link href="#tiers" className="nav-join">Join RONIN <Arrow /></Link>
          </div>

          <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            <a href="#intelligence" onClick={closeMenu}>Intelligence</a>
            <a href="#tiers" onClick={closeMenu}>Tiers</a>
            <a href="#method" onClick={closeMenu}>Method</a>
            <a href="#faq" onClick={closeMenu}>FAQ</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <Link href="#tiers" className="mobile-join" onClick={closeMenu}>Join RONIN <Arrow /></Link>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-art"><Image src={ARTWORK['hero-red-wide'].src} alt="RONIN samurai beneath a red moon" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} /></div>
          <div className="hero-vignette" />
          <div className="hero-grid" />
          <div className="hero-content shell">
            <p className="eyebrow"><span /> RONIN // ON-CHAIN INTELLIGENCE</p>
            <h1 id="hero-title">SEE WHAT<br /><em>THE NOISE HIDES.</em></h1>
            <p className="hero-copy">Real-time on-chain intelligence.<br />Early opportunities. Disciplined research.<br />Built for the few who see ahead.</p>
            <div className="hero-actions">
              <Link href="#tiers" className="button button-primary">JOIN RONIN <Arrow /></Link>
              <a href="#intelligence" className="button button-ghost"><span className="play">▶</span> EXPLORE INTELLIGENCE</a>
            </div>
            <div className="hero-meta">
              <div><b>REAL-TIME</b><span>On-chain data</span></div>
              <div><b>AI-POWERED</b><span>Signal intelligence</span></div>
              <div><b>VERIFIED</b><span>Disciplined research</span></div>
              <div><b>GLOBAL</b><span>Ronin community</span></div>
            </div>
          </div>
        </section>

        <section id="intelligence" className="section shell intelligence-section">
          <div className="section-heading">
            <div><p className="eyebrow"><span /> THE RONIN EDGE</p><h2>MORE THAN <em>SIGNALS.</em></h2></div>
            <p>RONIN is a research engine, intelligence service, and community built around one principle: <strong>data over hype.</strong></p>
          </div>
          <div className="edge-grid">
            <article><div className="edge-icon">01</div><h3>DISCOVER</h3><p>Scan the on-chain environment for activity worth understanding.</p></article>
            <article><div className="edge-icon">02</div><h3>QUALIFY</h3><p>Separate meaningful movement from noise, manipulation, and weak evidence.</p></article>
            <article><div className="edge-icon">03</div><h3>VERIFY</h3><p>Use multiple signals and independent evidence before intelligence is elevated.</p></article>
            <article><div className="edge-icon">04</div><h3>DELIVER</h3><p>Put the useful intelligence where members actually consume it: Telegram.</p></article>
          </div>
        </section>

        <section className="art-break shell" aria-label="RONIN philosophy">
          <div className="art-break-image"><Image src={ARTWORK['hero-gold-community'].src} alt="RONIN warrior beneath a golden moon" fill sizes="(max-width: 800px) 100vw, 55vw" style={{ objectFit: 'cover' }} /></div>
          <div className="art-break-copy"><p className="eyebrow gold-eyebrow"><span /> DISCIPLINE FUELS FREEDOM</p><h2>THE FEW WHO<br /><em>SEE AHEAD.</em></h2><p>Hype is loud. Evidence is quieter. RONIN is built for people who would rather understand what is happening before everyone else starts talking about it.</p><Link href="#method" className="text-link">OUR PHILOSOPHY <Arrow /></Link></div>
        </section>

        <section id="tiers" className="section shell tiers-section">
          <div className="section-heading center"><div><p className="eyebrow"><span /> ACCESS LEVELS</p><h2>CHOOSE YOUR <em>PATH.</em></h2></div><p>Different roads. One mission. A higher perspective.</p></div>
          <div className="tier-grid">
            {TIERS.map((tier, index) => (
              <article className={`tier-card tier-${tier.tone}`} key={tier.name}>
                <div className="tier-art"><Image src={ARTWORK[tier.image].src} alt={`${tier.name} Ronin artwork`} fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: 'cover', objectPosition: 'center' }} /></div>
                <div className="tier-shade" />
                <div className="tier-content">
                  <span className="tier-number">0{index + 1}</span>
                  <h3>{tier.name}</h3>
                  <p className="tier-tag">{tier.name === 'Open Circle' ? 'DISCUSS · LEARN · SHARE · GROW' : tier.name === 'Vanguard' ? 'EARLY INTELLIGENCE · REAL EDGE' : tier.name === 'Warden' ? 'DEEPER DATA · HIGHER CONVICTION' : 'THE HIGHEST PRIORITY'}</p>
                  <div className="tier-price"><strong>{tier.price}</strong><span>{tier.cadence}</span></div>
                  <ul>{tier.points.map(point => <li key={point}><span>◆</span>{point}</li>)}</ul>
                  <Link href="#contact" className="tier-cta">{tier.cta} <Arrow /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="founding"><span className="founding-mark">浪</span><div><b>FOUNDING ACCESS</b><p>First 50 members join Open Circle free. After #50, Open Circle is a one-time $1 joining fee.</p></div><span className="founding-count">50 <small>FOUNDING SPOTS</small></span></div>
        </section>

        <section id="method" className="section shell method-section">
          <div className="method-art"><Image src={ARTWORK['ronin-gold-discipline'].src} alt="RONIN discipline artwork" fill sizes="(max-width: 800px) 100vw, 45vw" style={{ objectFit: 'cover' }} /></div>
          <div className="method-copy"><p className="eyebrow gold-eyebrow"><span /> THE RONIN METHOD</p><h2>DISCIPLINE<br /><em>BEFORE ACTION.</em></h2><p>RONIN follows a deliberate intelligence lifecycle instead of chasing every green candle on the internet, a hobby apparently shared by most of humanity.</p><div className="method-steps"><span>SCAN</span><i>→</i><span>DISCOVER</span><i>→</i><span>QUALIFY</span><i>→</i><span>UNDERSTAND</span><i>→</i><span>VERIFY</span><i>→</i><span>DELIVER</span></div><p className="method-note">Detailed intelligence is delivered through Telegram. The public website stays focused on the mission, access, and standards.</p></div>
        </section>

        <section id="faq" className="section shell faq-section">
          <div className="section-heading center"><div><p className="eyebrow"><span /> QUESTIONS</p><h2>FREQUENTLY <em>ASKED.</em></h2></div><p>Clear answers. No smoke machine.</p></div>
          <div className="faq-list">{FAQ.map(([question, answer], i) => <div className={`faq-item ${faqOpen === i ? 'open' : ''}`} key={question}><button type="button" onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}><span>{question}</span><b>{faqOpen === i ? '−' : '+'}</b></button>{faqOpen === i && <div className="faq-answer"><p>{answer}</p></div>}</div>)}</div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-art"><Image src={ARTWORK['hero-red-perspective'].src} alt="RONIN red perspective artwork" fill sizes="100vw" style={{ objectFit: 'cover' }} /></div>
          <div className="contact-shade" />
          <div className="contact-content shell"><p className="eyebrow"><span /> THE RONIN CIRCLE</p><h2>INTELLIGENCE<br /><em>BEFORE THE CROWD.</em></h2><p>The website is the front door. Telegram is where RONIN intelligence is delivered.</p><div className="contact-actions"><Link href="#tiers" className="button button-primary">CHOOSE YOUR PATH <Arrow /></Link><a href="mailto:contact@ronin.hq" className="button button-ghost">CONTACT RONIN</a></div></div>
        </section>
      </main>

      <footer className="site-footer shell">
        <div className="footer-brand"><Image src={ARTWORK['ronin-official'].src} alt="RONIN" width={112} height={40} /><p>DATA OVER HYPE.<br />EVIDENCE OVER PROMISES.</p></div>
        <div className="footer-links"><a href="#intelligence">Intelligence</a><a href="#tiers">Tiers</a><a href="#method">Method</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div>
        <div className="footer-legal"><p>Not financial advice. High risk. Do your own research.</p><p>© 2026 RONIN. All rights reserved.</p></div>
      </footer>
    </div>
  );
}
