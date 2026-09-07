'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ARTWORK } from '@/lib/artwork';

const TIERS = [
  { name: 'OPEN CIRCLE', price: '$0', cadence: 'forever', tone: 'green', image: 'tier-open-circle', strap: 'DISCUSS · LEARN · SHARE · GROW', points: ['Community access', 'Ronin philosophy & research', 'Public announcements', 'No fabricated signals', 'Core market analysis'], cta: 'JOIN FREE' },
  { name: 'VANGUARD', price: '$79', cadence: '/ month', tone: 'silver', image: 'tier-vanguard', strap: 'EARLY INTELLIGENCE · REAL EDGE', points: ['24/7 intelligence access', 'Faster processing', 'Stronger verification', 'Priority alerts', 'Detailed intelligence receipts', 'Greater coverage'], cta: 'GET VANGUARD' },
  { name: 'WARDEN', price: '$199', cadence: '/ month', tone: 'gold', image: 'tier-warden', strap: 'DEEPER DATA · HIGHER CONVICTION', points: ['Everything in Vanguard', 'Deep intelligence', 'Advanced wallet intelligence', 'Continuous ranking', 'Deeper verification', 'Continuous analysis'], cta: 'GET WARDEN' },
  { name: 'SHOGUN', price: '$499', cadence: '/ month', tone: 'red', image: 'tier-shogun', strap: 'THE HIGHEST PRIORITY', points: ['Everything in Warden', 'Maximum priority', 'Deepest verification', 'Independent validation', 'Strongest available intelligence', 'Priority processing'], cta: 'GET SHOGUN' },
] as const;

const METHOD = [
  ['01', 'SCAN', 'Monitor the on-chain environment.'], ['02', 'DISCOVER', 'Find what matters before it becomes noise.'], ['03', 'QUALIFY', 'Filter weak, manipulated, or low-quality activity.'], ['04', 'UNDERSTAND', 'Build context around movement and behavior.'], ['05', 'VERIFY', 'Confirm through independent evidence.'], ['06', 'PREDICT', 'Generate a disciplined intelligence output.'], ['07', 'RECORD', 'Keep every decision traceable.'], ['08', 'TRACK', 'Follow the event after delivery.'], ['09', 'RESOLVE', 'Measure what actually happened.'], ['10', 'LEARN', 'Improve from evidence, not hindsight.'],
];

const FAQ = [
  ['What is RONIN?', 'RONIN is an on-chain intelligence service built around discovery, qualification, verification, prediction, and measured learning.'],
  ['Where is the intelligence delivered?', 'Telegram is the delivery layer. The website is the public front door for the mission, methodology, access levels, and community.'],
  ['Does the website publish live predictions?', 'No. The public website deliberately avoids publishing live predictions, signal receipts, or fake performance dashboards. Those belong in the Telegram experience.'],
  ['What changes between tiers?', 'Higher tiers increase coverage, processing priority, verification depth, monitoring, context, and intelligence depth. They never guarantee returns.'],
  ['How does founding access work?', 'The first 50 Open Circle members join free. After member 50, Open Circle becomes a one-time $1 joining fee. There is no monthly Open Circle fee.'],
  ['Is RONIN financial advice?', 'No. RONIN is an intelligence and research service. Crypto is high risk. Every member remains responsible for their own decisions.'],
];

function Arrow() { return <span aria-hidden="true">→</span>; }
function Mark({ children }: { children: React.ReactNode }) { return <span className="mark">{children}</span>; }

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return (
    <div className="ronin-site">
      <header className="site-header">
        <div className="nav-wrap shell-wide">
          <Link href="#top" className="brand" aria-label="RONIN home" onClick={() => setMenuOpen(false)}><Image src={ARTWORK['ronin-official'].src} alt="RONIN" width={145} height={48} priority className="brand-logo" /></Link>
          <nav className="desktop-nav" aria-label="Primary navigation"><a href="#top">HOME</a><a href="#intelligence">INTELLIGENCE</a><a href="#tiers">TIERS</a><a href="#about">ABOUT</a><a href="#faq">FAQ</a><a href="#contact">CONTACT</a></nav>
          <div className="nav-actions"><a href="#contact" className="nav-login">ACCESS</a><a href="#tiers" className="nav-join">JOIN RONIN <Arrow /></a></div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span/><span/><span/></button>
        </div>
        {menuOpen && <nav className="mobile-menu shell-wide"><a href="#top" onClick={() => setMenuOpen(false)}>HOME</a><a href="#intelligence" onClick={() => setMenuOpen(false)}>INTELLIGENCE</a><a href="#tiers" onClick={() => setMenuOpen(false)}>TIERS</a><a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a><a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a><a href="#tiers" className="mobile-join" onClick={() => setMenuOpen(false)}>JOIN RONIN <Arrow /></a></nav>}
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-art"><Image src={ARTWORK['hero-red-wide'].src} alt="RONIN samurai beneath a red moon" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} /></div><div className="hero-overlay"/><div className="side-kanji">先を行く者だけの世界</div>
          <div className="hero-inner shell"><p className="eyebrow"><Mark>RONIN // ALPHA INTELLIGENCE</Mark></p><h1>INTELLIGENCE<br/><em>BEFORE THE CROWD_</em></h1><p className="hero-copy">Real-time on-chain intelligence.<br/>Early opportunities. Unfair advantage.<br/>Built for the few who see ahead.</p><div className="hero-actions"><a href="#tiers" className="btn btn-primary">JOIN RONIN <Arrow /></a><a href="#intelligence" className="btn btn-outline"><span className="play">◉</span> WATCH INTRO</a></div><div className="hero-features"><div><b>REAL-TIME</b><span>On-Chain Data</span></div><div><b>AI-POWERED</b><span>Signal Engine</span></div><div><b>EXCLUSIVE</b><span>Curated Alpha</span></div><div><b>GLOBAL</b><span>Ronin Community</span></div></div></div>
          <div className="hero-side-copy"><span>DISCIPLINE</span><span>FUELS</span><span>FREEDOM</span><strong>浪人</strong></div>
        </section>

        <section id="tiers" className="tier-strip shell">{TIERS.map((tier,index)=><article key={tier.name} className={`mini-tier tier-${tier.tone}`}><div className="mini-art"><Image src={ARTWORK[tier.image].src} alt={`${tier.name} artwork`} fill sizes="25vw" style={{objectFit:'cover',objectPosition:'center top'}}/></div><div className="mini-shade"/><div className="mini-content"><span className="mini-number">0{index+1}</span><h2>{tier.name}</h2><p>{tier.strap}</p><a href={`#tier-${tier.tone}`} onClick={(e)=>{e.preventDefault();setSelectedTier(tier.name);document.getElementById('tier-details')?.scrollIntoView({behavior:'smooth'})}}>{tier.name==='OPEN CIRCLE'?'JOIN FREE':'LEARN MORE'} <Arrow /></a></div></article>)}</section>

        <section id="about" className="manifesto shell"><div className="manifesto-copy"><p className="eyebrow gold"><Mark>MORE THAN SIGNALS</Mark></p><h2>A HIGHER <em>STANDARD.</em></h2><p>RONIN is a community, a research engine, and a mindset. We combine real-time on-chain data, advanced analytics, and disciplined execution to surface opportunities before the crowd.</p><a href="#method" className="btn btn-gold">OUR PHILOSOPHY <Arrow /></a></div><div className="manifesto-art"><Image src={ARTWORK['hero-gold-community'].src} alt="Ronin warrior beneath a golden moon" fill sizes="60vw" style={{objectFit:'cover',objectPosition:'center'}}/><div className="manifesto-caption"><span>DATA · INSIGHT · ADVANTAGE</span><b>観察・分析・先を行く</b></div></div><div className="edge-panel"><h3>THE RONIN EDGE</h3><div className="edge-grid"><div><b>◎ REAL-TIME</b><span>On-Chain Monitoring</span></div><div><b>◈ AI-POWERED</b><span>Signal Detection</span></div><div><b>◉ EXCLUSIVE</b><span>Curated Opportunities</span></div><div><b>◎ GLOBAL</b><span>Like-Minded Community</span></div></div><small>NOT FINANCIAL ADVICE. HIGH RISK. DO YOUR OWN RESEARCH.</small></div></section>

        <section id="intelligence" className="intelligence shell"><div className="section-head"><div><p className="eyebrow"><Mark>RONIN // INTELLIGENCE ENGINE</Mark></p><h2>SEE WHAT<br/><em>THE NOISE HIDES.</em></h2></div><p>RONIN is not a public prediction board. It is the intelligence layer behind the Telegram experience, designed to find, verify, explain, and track what matters.</p></div><div className="intelligence-grid"><article className="intel-feature"><span>01</span><h3>DATA OVER HYPE.</h3><p>Raw on-chain activity becomes structured evidence instead of another wall of green numbers.</p></article><article className="intel-feature"><span>02</span><h3>EVIDENCE OVER PROMISES.</h3><p>Weak evidence is filtered. Independent confirmation matters. No fabricated signals.</p></article><article className="intel-feature"><span>03</span><h3>EVERY OUTPUT HAS A RECORD.</h3><p>RONIN is built to learn from outcomes rather than rewriting history after the fact.</p></article><article className="intel-feature accent"><span>04</span><h3>TELEGRAM IS THE DELIVERY LAYER.</h3><p>The public site stays focused. Detailed intelligence belongs where members receive it.</p></article></div></section>

        <section id="method" className="method shell"><div className="method-art"><Image src={ARTWORK['ronin-gold-discipline'].src} alt="RONIN methodology artwork" fill sizes="100vw" style={{objectFit:'cover',objectPosition:'center'}}/></div><div className="method-overlay"/><div className="method-inner"><p className="eyebrow gold"><Mark>THE RONIN METHODOLOGY</Mark></p><h2>DISCIPLINE<br/><em>FUELS FREEDOM.</em></h2><div className="method-grid">{METHOD.map(([n,t,d])=><div key={n}><b>{n}</b><strong>{t}</strong><span>{d}</span></div>)}</div><p className="method-quote">DATA OVER HYPE. EVIDENCE OVER PROMISES.<br/>NO FABRICATED SIGNALS. EVERY OUTPUT LEAVES A RECEIPT.</p></div></section>

        <section id="tier-details" className="pricing shell"><div className="section-head centered"><div><p className="eyebrow"><Mark>ACCESS LEVELS</Mark></p><h2>CHOOSE YOUR <em>PATH.</em></h2></div><p>Different roads. One mission. A higher perspective.</p></div><div className="pricing-grid">{TIERS.map(tier=><article id={`tier-${tier.tone}`} key={tier.name} className={`pricing-card tier-${tier.tone} ${selectedTier===tier.name?'selected':''}`} onClick={()=>setSelectedTier(tier.name)}><div className="pricing-image"><Image src={ARTWORK[tier.image].src} alt={`${tier.name} membership`} fill sizes="(max-width:800px) 100vw,25vw" style={{objectFit:'cover',objectPosition:'center top'}}/></div><div className="pricing-body"><div className="pricing-top"><span>{tier.name}</span><small>{tier.strap}</small></div><div className="price"><strong>{tier.price}</strong><span>{tier.cadence}</span></div><ul>{tier.points.map(point=><li key={point}>◆ {point}</li>)}</ul><button type="button" className="tier-button" onClick={(e)=>{e.stopPropagation();setSelectedTier(tier.name);go('contact')}}>{tier.cta} <Arrow /></button></div></article>)}</div><div className="founding"><div className="founding-symbol">浪</div><div><b>FOUNDING ACCESS</b><p>First 50 members join Open Circle free. After #50, Open Circle becomes a one-time $1 joining fee.</p></div><strong>50 <small>FOUNDING SPOTS</small></strong></div></section>

        <section className="safety shell"><div><p className="eyebrow"><Mark>SAFETY & RESPONSIBILITY</Mark></p><h2>TRADE <em>SMARTER.</em><br/>STAY SAFE.</h2></div><div className="safety-grid"><article><b>◉</b><h3>IDENTIFY SCAMS</h3><p>Learn to spot suspicious tokens and common attack patterns.</p></article><article><b>◈</b><h3>VERIFY INFORMATION</h3><p>Cross-check important information through multiple sources.</p></article><article><b>◇</b><h3>PROTECT YOUR WALLET</h3><p>Never share private keys or seed phrases.</p></article><article><b>◎</b><h3>UNDERSTAND RISK</h3><p>Crypto is high risk. Intelligence is not a guarantee.</p></article></div></section>

        <section id="faq" className="faq shell"><div className="section-head centered"><div><p className="eyebrow"><Mark>QUESTIONS</Mark></p><h2>FREQUENTLY <em>ASKED.</em></h2></div><p>Clear answers. No smoke machine.</p></div><div className="faq-list">{FAQ.map(([q,a],i)=><div className={`faq-item ${faqOpen===i?'open':''}`} key={q}><button onClick={()=>setFaqOpen(faqOpen===i?null:i)} aria-expanded={faqOpen===i}><span>{q}</span><b>{faqOpen===i?'−':'+'}</b></button>{faqOpen===i&&<p>{a}</p>}</div>)}</div></section>

        <section id="contact" className="contact shell"><div className="contact-art"><Image src={ARTWORK['hero-red-perspective'].src} alt="RONIN red perspective" fill sizes="100vw" style={{objectFit:'cover',objectPosition:'center'}}/></div><div className="contact-overlay"/><div className="contact-inner"><p className="eyebrow"><Mark>THE RONIN CIRCLE</Mark></p><h2>THE WEBSITE IS THE<br/><em>FRONT DOOR.</em></h2><p>Detailed RONIN intelligence is delivered through Telegram. Join the circle, choose your path, and keep the noise outside.</p><div className="contact-actions"><a href="#tiers" className="btn btn-primary">CHOOSE YOUR PATH <Arrow /></a><a href="#socials" className="btn btn-outline">FOLLOW RONIN <Arrow /></a></div></div></section>
      </main>

      <footer id="socials" className="footer shell-wide"><div className="footer-main"><div className="footer-brand"><Image src={ARTWORK['ronin-official'].src} alt="RONIN" width={140} height={46}/><p>INTELLIGENCE BEFORE THE CROWD.</p></div><div className="footer-col"><b>PRODUCT</b><a href="#top">Home</a><a href="#intelligence">Intelligence</a><a href="#tier-details">Tiers</a><a href="#method">Method</a></div><div className="footer-col"><b>COMPANY</b><a href="#about">About</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div><div className="footer-col"><b>LEGAL</b><a href="#faq">Terms of Service</a><a href="#faq">Privacy Policy</a><a href="#faq">Risk Disclosure</a><a href="#faq">Cookie Policy</a></div><div className="footer-social"><b>FOLLOW RONIN</b><div><a href="https://github.com/Bivanjit/ronin-hq" target="_blank" rel="noreferrer">GitHub</a><a href="#contact">Telegram</a><a href="#contact">Discord</a><a href="#contact">X / Twitter</a><a href="#contact">YouTube</a></div><p>Telegram is the official delivery channel for RONIN intelligence.</p></div></div><div className="footer-bottom"><span>© 2026 RONIN. All rights reserved.</span><span>DATA OVER HYPE. EVIDENCE OVER PROMISES.</span><span>観察 · 分析 · 先を行く</span></div></footer>
    </div>
  );
}
