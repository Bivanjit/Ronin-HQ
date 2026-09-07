'use client';

import Link from 'next/link';
import {useState} from 'react';

export default function Login(){
  const [email,setEmail]=useState('');
  const [message,setMessage]=useState('');

  function submit(e:React.FormEvent){
    e.preventDefault();
    if(!email.trim()){
      setMessage('ENTER AN EMAIL ADDRESS TO CONTINUE.');
      return;
    }
    setMessage('AUTHENTICATION BACKEND NOT CONNECTED. DEMO ACCESS AVAILABLE.');
  }

  return <main className="auth-page">
    <div className="auth-grid"/>
    <section className="auth-card">
      <Link href="/" className="brand auth-brand"><span className="brand-mark">浪</span>RONIN</Link>
      <span className="kicker">RONIN // SECURE ACCESS</span>
      <h1>ENTER THE<br/><em>INTELLIGENCE LAYER.</em></h1>
      <p className="auth-copy">Access your intelligence workspace, signal receipts, wallet context and accountable prediction records.</p>

      <form onSubmit={submit} className="auth-form">
        <label htmlFor="email">EMAIL</label>
        <input id="email" type="email" autoComplete="email" placeholder="you@domain.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        <button className="btn primary large" type="submit">CONTINUE →</button>
      </form>

      {message&&<div className="auth-message">{message}</div>}

      <div className="auth-divider"><span>OR</span></div>
      <Link href="/app" className="btn ghost large">ENTER DEMO WORKSPACE</Link>
      <p className="auth-foot">No live credentials are fabricated. Demo mode is explicitly labeled throughout the product.</p>
    </section>
  </main>;
}
