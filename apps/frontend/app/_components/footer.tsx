'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────── */
interface FooterLink {
  label: string;
  href: string;
}

/* ─── Animation variants ─────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/* ─── Data ───────────────────────────────────────────── */
const NAV_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Discover',
    links: [
      { label: 'All Events', href: '/events' },
      { label: 'Concerts', href: '/events/concerts' },
      { label: 'Festivals', href: '/events/festivals' },
      { label: 'Comedy Shows', href: '/events/comedy' },
      { label: 'Conferences', href: '/events/conferences' },
      { label: 'Workshops', href: '/events/workshops' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Ticket Refunds', href: '/refunds' },
      { label: 'For Organizers', href: '/organizers' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Twitter,   href: 'https://twitter.com',   label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com',  label: 'Instagram' },
  { icon: Facebook,  href: 'https://facebook.com',   label: 'Facebook' },
  { icon: Linkedin,  href: 'https://linkedin.com',   label: 'LinkedIn' },
  { icon: Youtube,   href: 'https://youtube.com',    label: 'YouTube' },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

const TICKER_ITEMS = [
  'Live events',
  'Secure tickets',
  'Stress‑free entry',
  'Real moments',
  'Better nights',
  'Find your crowd',
  'Book with confidence',
  'Be there',
];

/* ─── Colour tokens (white theme) ─────────────────────
   bg:       #ffffff  white
   surface:  #f5f5f5  ticker + bottom strip
   navy:     #1a237e  primary-900 — logo navy, headings, primary CTA
   navyHov:  #283593  primary-800 — hover state
   orange:   #ff9800  accent-500  — logo orange, section labels, accents
   orangeHov:#fb8c00  accent-600  — hover
   border:   #e0e0e0  gray-300
   text:     #424242  gray-800 — body
   muted:    #757575  gray-600 — secondary text
   hint:     #9e9e9e  gray-500 — hints / placeholders
──────────────────────────────────────────────────────── */
const C = {
  bg:         '#ffffff',
  surface:    '#f5f5f5',
  navy:       '#1a237e',
  navyHov:    '#283593',
  navyFaint:  'rgba(26,35,126,0.06)',
  orange:     '#ff9800',
  orangeHov:  '#fb8c00',
  orangeFaint:'rgba(255,152,0,0.10)',
  orangeDim:  'rgba(255,152,0,0.50)',
  border:     '#e0e0e0',
  borderHov:  '#bdbdbd',
  text:       '#424242',
  muted:      '#757575',
  hint:       '#9e9e9e',
};

/* ─── Ticker ─────────────────────────────────────────── */
const Ticker: React.FC = () => (
  <div
    className="relative flex overflow-hidden py-3 select-none border-t border-accent-950"
    style={{ background: C.surface, borderBottom: `1px solid ${C.border}` }}
  >
    {[0, 1].map((i) => (
      <motion.div
        key={i}
        aria-hidden={i === 1}
        animate={{ x: ['0%', '-100%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="flex shrink-0 items-center gap-6 pr-6"
      >
        {TICKER_ITEMS.map((item) => (
          <React.Fragment key={item}>
            <span
              className="text-[10px] font-black uppercase tracking-[0.28em]"
              style={{ color: C.hint }}
            >
              {item}
            </span>
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: C.orangeDim }}
            />
          </React.Fragment>
        ))}
      </motion.div>
    ))}
  </div>
);

/* ─── Main component ─────────────────────────────────── */
const TickPassFooter: React.FC = () => {
  const [email, setEmail]           = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [focused, setFocused]       = useState(false);

  const handleSubscribe = () => {
    if (email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => { setSubscribed(false); setEmail(''); }, 3000);
    }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: C.bg, color: C.text }}
    >
      {/* ── Ticker ── */}
      <Ticker />

      {/* ── Logo hero band ── */}
      <div
        className="relative px-6 py-10 sm:px-10 lg:px-16"
        style={{ borderBottom: `1px solid ${C.border}` }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          {/* Logo */}
          <Link href="/" className="group block leading-none">
            <img
              src="/logo2.png"
              alt="TickPass"
              className="h-auto w-auto transition-opacity duration-300 group-hover:opacity-80"
              style={{ maxHeight: 'clamp(3rem, 9vw, 6.5rem)' }}
            />
          </Link>

          {/* Right: tagline + CTAs */}
          <div className="max-w-sm lg:pb-2 lg:text-right">
            <p className="text-sm leading-7" style={{ color: C.muted }}>
              The cleanest way to discover live experiences, secure your seat, and walk in ready.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/events"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-black text-white transition-colors"
                style={{ background: C.navy }}
                onMouseEnter={e => (e.currentTarget.style.background = C.navyHov)}
                onMouseLeave={e => (e.currentTarget.style.background = C.navy)}
              >
                Find Events
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/createEvent"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-black transition"
                style={{ border: `1.5px solid ${C.navy}`, color: C.navy, background: 'transparent' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = C.navyFaint;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Middle: nav + contact + newsletter ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={stagger}
        className="mx-auto grid max-w-7xl px-6 sm:px-10 lg:grid-cols-[1fr_auto_320px] lg:px-16"
      >
        {/* Nav columns */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-3 lg:pr-14"
          style={{ borderBottom: `1px solid ${C.border}` }}
        >
          {NAV_COLUMNS.map((col) => (
            <motion.nav key={col.title} variants={fadeUp} aria-label={col.title}>
              <h4
                className="mb-5 text-[9px] font-black uppercase tracking-[0.26em]"
                style={{ color: C.orange }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm transition-all duration-200"
                      style={{ color: C.muted }}
                      onMouseEnter={e => (e.currentTarget.style.color = C.navy)}
                      onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                    >
                      <span
                        className="inline-block h-px w-0 transition-all duration-300 group-hover:w-3"
                        style={{ background: C.orange }}
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </motion.div>

        {/* Contact + socials */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col justify-between gap-10 py-12 lg:px-14"
          style={{
            borderBottom: `1px solid ${C.border}`,
            borderLeft: 'none',
          }}
        >
          <div>
            <h4
              className="mb-6 text-[9px] font-black uppercase tracking-[0.26em]"
              style={{ color: C.orange }}
            >
              Get in touch
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:support@tickpass.com"
                className="flex items-start gap-3 text-sm transition"
                style={{ color: C.muted }}
                onMouseEnter={e => (e.currentTarget.style.color = C.navy)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" style={{ color: C.orange }} />
                <span>support@tickpass.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-start gap-3 text-sm transition"
                style={{ color: C.muted }}
                onMouseEnter={e => (e.currentTarget.style.color = C.navy)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0" style={{ color: C.navy }} />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-start gap-3 text-sm" style={{ color: C.hint }}>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: C.hint }} />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          <div>
            <h4
              className="mb-4 text-[9px] font-black uppercase tracking-[0.26em]"
              style={{ color: C.hint }}
            >
              Follow us
            </h4>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center transition-all duration-200 hover:-translate-y-1"
                  style={{ border: `1px solid ${C.border}`, color: C.hint, background: C.bg }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = C.orange;
                    e.currentTarget.style.background = C.orangeFaint;
                    e.currentTarget.style.color = C.orange;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.background = C.bg;
                    e.currentTarget.style.color = C.hint;
                  }}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          variants={fadeUp}
          className="group relative overflow-hidden py-12 lg:pl-14"
          style={{ borderBottom: `1px solid ${C.border}` }}
        >
          {/* Decorative envelope watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-4 select-none text-[110px] leading-none"
            style={{ color: 'rgba(26,35,126,0.04)' }}
          >
            ✉
          </span>

          <div className="relative z-10">
            <h4
              className="mb-1 text-[9px] font-black uppercase tracking-[0.26em]"
              style={{ color: C.orange }}
            >
              The List
            </h4>
            <h3
              className="mb-4 text-2xl font-black leading-tight"
              style={{ color: C.navy }}
            >
              Events worth showing up for — in your inbox.
            </h3>
            <p className="mb-7 text-sm leading-6" style={{ color: C.muted }}>
              Curated drops: standout events, new organizers, and early ticket access. Short, sharp, weekly.
            </p>

            <div
              className="flex overflow-hidden transition-colors duration-200"
              style={{
                border: `1px solid ${focused ? C.orange : subscribed ? C.orangeDim : C.border}`,
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="your@email.com"
                aria-label="Email address for newsletter"
                className="min-w-0 flex-1 px-4 py-3 text-sm outline-none"
                style={{ background: C.bg, color: C.text }}
              />
              <button
                type="button"
                onClick={handleSubscribe}
                disabled={subscribed}
                aria-label="Subscribe to newsletter"
                className="flex w-12 shrink-0 items-center justify-center text-white transition-colors"
                style={{ background: subscribed ? C.orangeHov : C.orange }}
                onMouseEnter={e => { if (!subscribed) e.currentTarget.style.background = C.orangeHov; }}
                onMouseLeave={e => { if (!subscribed) e.currentTarget.style.background = C.orange; }}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <p
              className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300"
              style={{ color: subscribed ? C.orange : C.hint }}
            >
              {subscribed ? '✓ You are on the list.' : 'No spam. Unsubscribe anytime.'}
            </p>
          </div>

          {/* Sweep accent line on hover */}
          <span
            className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 ease-out group-hover:w-full"
            style={{ background: C.orange }}
          />
        </motion.div>
      </motion.div>

      {/* ── Bottom strip ── */}
      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center sm:px-10 lg:px-16">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: C.hint }}
          >
            © {new Date().getFullYear()} TickPass · All rights reserved
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] font-bold uppercase tracking-[0.18em] transition"
                style={{ color: C.hint }}
                onMouseEnter={e => (e.currentTarget.style.color = C.orange)}
                onMouseLeave={e => (e.currentTarget.style.color = C.hint)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default TickPassFooter;