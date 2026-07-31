'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function TicketRecoveryForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setStatus('loading');
    
    try {
      const res = await fetch('/api/v1/tickets/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(data.status === 'success' ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 border border-primary-100 bg-primary-50/30 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary-200">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-primary-950 mb-2 italic font-semibold">Transmission Sent.</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          We’ve dispatched your ticket details to <span className="text-black font-semibold">{email}</span>. 
          Please check your inbox (and spam folder) within the next 2 minutes.
        </p>
        <button 
          onClick={() => {setStatus('idle'); setEmail('');}}
          className="font-mono text-[10px] uppercase tracking-widest text-primary-600 hover:text-black transition-colors font-bold border-b border-primary-200 pb-1"
        >
          ← Recover another email
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="relative group">
        <label 
          htmlFor="email" 
          className="block font-mono text-[12px] uppercase tracking-[0.2em] text-accent-400 mb-2 group-focus-within:text-primary-500 transition-colors"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter the purchase email..."
          disabled={status === 'loading'}
          className="w-full bg-transparent border-b-2 border-gray-400 py-4 text-xl outline-none transition-all focus:border-primary-500 disabled:opacity-40 placeholder:text-gray-600 font-serif italic"
        />
        {/* Accent Focus bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-accent-500 w-0 group-focus-within:w-full transition-all duration-700 ease-out" />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!email.trim() || status === 'loading'}
        className="w-full group relative flex items-center justify-center gap-4 py-6 bg-primary-950 text-white transition-all hover:bg-black disabled:bg-gray-100 disabled:text-gray-400 overflow-hidden"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] font-medium relative z-10">
          {status === 'loading' ? 'Verifying...' : 'Retrieve Ticket'}
        </span>
        {status !== 'loading' && (
          <svg 
            className="group-hover:translate-x-1 transition-transform relative z-10" 
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {/* Hover background effect */}
        <div className="absolute inset-0 bg-primary-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>

      {status === 'error' && (
        <p className="text-[10px] font-mono text-error-500 text-center uppercase tracking-widest animate-pulse">
          Connection Error. Please try again.
        </p>
      )}
    </div>
  );
}