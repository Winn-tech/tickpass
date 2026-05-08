import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  QrCode,
  Sparkles,
  Ticket,
  TicketCheck,
} from 'lucide-react';
import { attendeeFlow, creatorFlow, faqs, pricingNotes, reasons, steps, ticketTypes } from './data';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

const cardLift = 'transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-950/8';

const HeroTicket = () => (
  <motion.div
    initial={{ opacity: 0, y: 34, rotate: -1 }}
    animate={{ opacity: 1, y: 0, rotate: 0 }}
    whileHover={{ y: -8, rotate: 0.5 }}
    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
    className="relative mx-auto max-w-[520px]"
  >
    <div className="absolute -left-6 top-16 hidden h-44 w-12 rounded-sm bg-accent-400/80 shadow-2xl shadow-accent-500/25 lg:block" />
    <div className="absolute -right-4 bottom-10 hidden h-28 w-28 rounded-sm border border-white/15 bg-white/10 backdrop-blur md:block" />

    <div className="relative overflow-hidden rounded-lg border border-white/15 bg-white text-gray-900 shadow-2xl shadow-black/35">
      <div className="grid grid-cols-[1fr_116px]">
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-accent-600">Tickpass live</p>
              <h2 className="mt-3 text-3xl font-black leading-none text-primary-950 sm:text-4xl">Afro Tech Night</h2>
            </div>
            <BadgeCheck className="h-8 w-8 shrink-0 text-accent-500" />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ['Date', '24 MAY'],
              ['Gate', '7:00 PM'],
              ['Pass', 'VIP'],
            ].map(([label, value]) => (
              <div key={label} className="border border-gray-200 p-3 transition duration-300 hover:-translate-y-1 hover:border-accent-300">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">{label}</p>
                <p className="mt-2 text-sm font-black text-primary-950">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-5 border-t border-dashed border-gray-300 pt-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Order</p>
              <p className="mt-1 font-mono text-sm font-black text-primary-950">TP-2405-9182</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center bg-primary-950 text-white">
              <QrCode className="h-10 w-10" />
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-between border-l border-dashed border-gray-300 bg-primary-950 px-4 py-6 text-white">
          <span className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-primary-950" />
          <span className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-primary-950" />
          <p className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-black uppercase tracking-[0.35em] text-accent-300">
            Valid entry
          </p>
          <TicketCheck className="h-9 w-9 text-accent-300" />
        </div>
      </div>
    </div>
  </motion.div>
);

const PricingArtwork = () => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.28 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="group relative min-h-[520px]"
  >
    {/* Decorative background bars */}
    <div className="absolute left-2 top-10 hidden h-[360px] w-16 -rotate-6 rounded-lg bg-accent-500 shadow-2xl shadow-accent-500/25 transition duration-500 group-hover:-translate-x-2 group-hover:translate-y-3 sm:block" />
    <div className="absolute bottom-12 right-4 hidden h-[280px] w-12 rotate-6 rounded-lg border border-primary-200 bg-white transition duration-500 group-hover:translate-x-2 group-hover:-translate-y-3 sm:block" />

    {/* Card 1 — Free event: lifts up-left on hover */}
    <div className="absolute left-0 top-0 w-[82%] rotate-[-10deg] rounded-2xl border border-primary-100 bg-white p-6 shadow-2xl shadow-primary-950/12 transition duration-500 group-hover:-translate-y-4 group-hover:-translate-x-1 group-hover:rotate-[-4deg] sm:p-7">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent-600">Free event pass</p>
          <p className="mt-4 text-6xl font-black leading-none text-primary-950 sm:text-7xl">0</p>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-gray-500">setup cost</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-950 text-accent-300">
          <Ticket className="h-7 w-7" />
        </div>
      </div>
      <div className="mt-8 border-t border-dashed border-gray-300 pt-5">
        <p className="text-sm leading-7 text-gray-600">
          Publish free registrations without turning a community moment into an invoice.
        </p>
      </div>
    </div>

    {/* Card 2 — Paid ticket: slides down-right on hover */}
    <div className="absolute bottom-8 right-0 w-[86%] rotate-[2deg] overflow-hidden rounded-2xl border border-primary-900 bg-primary-950 p-6 text-white shadow-2xl shadow-primary-950/25 transition duration-500 group-hover:translate-y-4 group-hover:translate-x-1 group-hover:rotate-[4deg] sm:p-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-45 rounded-2xl"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255,152,0,0.16) 0 12%, transparent 12% 24%, rgba(255,255,255,0.04) 24% 36%, transparent 36% 100%)',
          backgroundSize: '140px 140px',
        }}
      />
      <div className="relative">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent-300">Paid ticket rhythm</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-4xl font-black leading-none sm:text-5xl">Fees follow the sale.</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-primary-100">
              No complicated launch math. Tickpass earns when your paid tickets move.
            </p>
          </div>
          <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-white/20 bg-white/10">
            <CircleDollarSign className="h-12 w-12 text-accent-300" />
          </div>
        </div>
      </div>
    </div>

    {/* Card 3 — Creator-friendly: nudges right on hover */}
    <div className="absolute left-[8%] top-[42%] w-[70%] rounded-2xl border border-accent-200 bg-accent-50 px-5 py-4 shadow-xl shadow-accent-500/10 transition duration-500 group-hover:translate-x-4 group-hover:-translate-y-1 sm:w-[58%]">
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-accent-700">Creator-friendly</p>
      <p className="mt-2 text-sm font-bold leading-6 text-primary-950">Transparent enough for small workshops. Strong enough for big nights.</p>
    </div>
  </motion.div>
);

export const HeroSection = () => (
  <section className="relative bg-primary-950 px-4 py-20 text-white sm:px-6 lg:py-28">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '54px 54px',
      }}
    />
    <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent-400 to-transparent" />

    <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.98fr_1.02fr]">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-accent-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.26em] text-accent-300">
            How Tickpass works
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="max-w-4xl text-5xl font-black leading-[0.98] [font-family:var(--font-fraunces)] sm:text-6xl lg:text-7xl">
          <span>From idea to sold-out entry,</span>
          <span className="mt-2 block text-accent-300 [font-family:var(--font-playwrite-de-sas)] [font-variation-settings:'wght'_380] sm:mt-3">
            beautifully handled.
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-primary-100 sm:text-xl">
          Create an event page, sell the right tickets, collect secure payments, and welcome guests with QR check-in that keeps the queue moving.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/createEvent" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/25">
            Create Event
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/events" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-black text-white transition hover:-translate-y-1 hover:border-accent-300 hover:bg-white/10">
            Explore Events
          </Link>
        </motion.div>
      </motion.div>

      <HeroTicket />
    </div>
  </section>
);

export const SimpleFlowSection = () => (
  <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:py-24">
    <div className="mx-auto max-w-7xl">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="mb-12 max-w-3xl">
        <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.22em] text-accent-600">The simple flow</motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black tracking-tight text-primary-950 sm:text-5xl">
          Four moves. One clean event machine.
        </motion.h2>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={stagger} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <motion.article key={step.title} variants={fadeUp} className={`group relative min-h-[300px] overflow-hidden rounded-lg border border-gray-200 bg-white p-6 hover:border-accent-300 ${cardLift}`}>
              <span className="absolute right-4 top-3 text-6xl font-black leading-none text-gray-100 transition group-hover:text-accent-100">{step.number}</span>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-800 transition group-hover:bg-accent-500 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="relative z-10 mt-10 text-2xl font-black leading-tight text-primary-950">{step.title}</h3>
              <p className="relative z-10 mt-4 text-sm leading-7 text-gray-600">{step.text}</p>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-accent-500 transition-all duration-500 group-hover:w-full" />
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export const CreatorSection = () => (
  <section className="px-4 py-20 sm:px-6 lg:py-24">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={stagger}>
        <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.22em] text-accent-600">For organizers</motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black tracking-tight text-primary-950 sm:text-5xl">
          Your back office, without the back-and-forth.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 text-lg leading-8 text-gray-600">
          Tickpass gives creators a focused control room for publishing, ticketing, payments, guests, and entry.
        </motion.p>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="grid gap-4 sm:grid-cols-2">
        {creatorFlow.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} variants={fadeUp} className={`rounded-lg border border-gray-200 bg-white p-6 hover:border-accent-300 ${cardLift}`}>
              <Icon className="h-6 w-6 text-accent-600" />
              <h3 className="mt-5 text-xl font-black text-primary-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{item.text}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export const AttendeeSection = () => (
  <section className="bg-primary-950 px-4 py-20 text-white sm:px-6 lg:py-24">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger} className="grid gap-3 sm:grid-cols-2">
        {attendeeFlow.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} variants={fadeUp} className="border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-2 hover:border-accent-400/50 hover:bg-accent-500/[0.06] hover:shadow-xl hover:shadow-black/15">
              <Icon className="h-6 w-6 text-accent-300" />
              <h3 className="mt-5 text-xl font-black">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-primary-100">{item.text}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={stagger}>
        <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.22em] text-accent-300">For attendees</motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Guests get the confidence to show up ready.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 text-lg leading-8 text-primary-100">
          Clear details, secure checkout, digital tickets, and smoother entry make the event feel organized before anyone reaches the venue.
        </motion.p>
      </motion.div>
    </div>
  </section>
);

export const TicketTypesSection = () => (
  <section className="px-4 py-20 sm:px-6 lg:py-24">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={stagger}>
        <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.22em] text-accent-600">Ticket types</motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black tracking-tight text-primary-950 sm:text-5xl">
          Build the exact access your event needs.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 text-lg leading-8 text-gray-600">
          Sell simple general admission or create layered access for tables, VIPs, groups, private guests, and online audiences.
        </motion.p>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="flex flex-wrap gap-3">
        {ticketTypes.map((type) => (
          <motion.span key={type} variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-sm font-black text-primary-950 transition duration-300 hover:-translate-y-1.5 hover:border-accent-300 hover:bg-white hover:shadow-lg hover:shadow-primary-950/8">
            <CheckCircle2 className="h-4 w-4 text-accent-600" />
            {type}
          </motion.span>
        ))}
      </motion.div>
    </div>
  </section>
);

export const PricingSection = () => (
  <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:py-24">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <PricingArtwork />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={stagger}>
        <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.22em] text-accent-600">Pricing snapshot</motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black tracking-tight text-primary-950 sm:text-5xl">
          Free events stay free. Paid events pay when tickets sell.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 text-lg leading-8 text-gray-600">
          Keep setup simple, keep costs predictable, and let the fee model support the moments that actually earn.
        </motion.p>
        <motion.div variants={stagger} className="mt-8 grid gap-3">
          {pricingNotes.map((note) => (
            <motion.div key={note} variants={fadeUp} className="flex items-center gap-3 border border-gray-200 bg-white px-4 py-3 transition duration-300 hover:-translate-y-1.5 hover:border-accent-300 hover:shadow-lg hover:shadow-primary-950/5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-600" />
              <p className="text-sm font-bold text-primary-950">{note}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export const ReasonsSection = () => (
  <section className="px-4 py-20 sm:px-6 lg:py-24">
    <div className="mx-auto max-w-7xl">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={stagger} className="mx-auto max-w-3xl text-center">
        <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.22em] text-accent-600">Why Tickpass</motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black tracking-tight text-primary-950 sm:text-5xl">
          Made for events that need to feel effortless.
        </motion.h2>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason) => {
          const Icon = reason.icon;
          return (
            <motion.article key={reason.title} variants={fadeUp} className={`rounded-lg border border-gray-200 bg-white p-6 ${cardLift}`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-800">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-lg font-black text-primary-950">{reason.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{reason.text}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export const FaqSection = () => (
  <section className="px-4 py-20 sm:px-6 lg:py-24">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={stagger}>
        <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.22em] text-accent-600">Questions</motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black tracking-tight text-primary-950 sm:text-5xl">
          The quick answers.
        </motion.h2>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="space-y-3">
        {faqs.map((faq) => (
          <motion.details key={faq.question} variants={fadeUp} className="group rounded-lg border border-gray-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-lg hover:shadow-primary-950/5 open:border-accent-300 open:shadow-lg open:shadow-primary-950/5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black text-primary-950">
              {faq.question}
              <ChevronDown className="h-5 w-5 shrink-0 text-accent-600 transition group-open:rotate-180" />
            </summary>
            <p className="mt-4 text-sm leading-7 text-gray-600">{faq.answer}</p>
          </motion.details>
        ))}
      </motion.div>
    </div>
  </section>
);

export const FinalCtaSection = () => (
  <section className="px-4 pb-20 sm:px-6 lg:pb-24">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={stagger} className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-gray-950 p-8 text-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-950/20 sm:p-10 lg:p-12">
      <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-accent-300" />
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent-300">Ready to launch</p>
      </motion.div>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <motion.h2 variants={fadeUp} className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
          Turn the event in your head into a ticket people can actually buy.
        </motion.h2>
        <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
          <Link href="/createEvent" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-accent-600">
            Create Event
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/events" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/10">
            Explore Events
          </Link>
        </motion.div>
      </div>
    </motion.div>
  </section>
);