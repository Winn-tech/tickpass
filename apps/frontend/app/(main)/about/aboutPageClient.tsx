'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Handshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  UsersRound,
} from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const impactStats = [
  { value: '99.9%', label: 'secure and reliable ticket delivery' },
  { value: '4.9/5', label: 'experience rating from happy guests' },
  { value: '24/7', label: 'digital access to tickets and details' },
];

const problems = [
  'Event discovery is scattered across too many channels.',
  'Guests need clearer details before they commit.',
  'Organizers need better visibility, smoother sales, and cleaner entry.',
];

const audiences = [
  {
    title: 'For attendees',
    description:
      'Tickpass helps people find the right experience quickly, book with confidence, and arrive with everything they need already in hand.',
    points: ['Curated discovery', 'Secure digital tickets', 'Simple event details'],
  },
  {
    title: 'For organizers',
    description:
      'We give event creators a sharper way to publish, promote, sell, and manage attendance without turning operations into a full-time headache.',
    points: ['Online ticket sales', 'Attendee management', 'Fast check-in support'],
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust first',
    text: 'People should know what they are paying for, where they are going, and how to get in.',
  },
  {
    icon: Sparkles,
    title: 'Make access simple',
    text: 'Great experiences should not be buried under messy discovery or stressful checkout flows.',
  },
  {
    icon: MapPin,
    title: 'Celebrate local culture',
    text: 'The best events are often close by. Tickpass is built to make those moments easier to find.',
  },
  {
    icon: Handshake,
    title: 'Support creators',
    text: 'Organizers deserve tools that help them look credible, sell faster, and serve guests better.',
  },
];

const experienceTypes = [
  'Music',
  'Technology',
  'Comedy',
  'Business',
  'Food',
  'Culture',
  'Wellness',
  'Workshops',
];

const missionPillars = [
  {
    number: '01',
    tag: 'Step one',
    icon: CalendarCheck,
    title: 'Discover',
    body: 'Bring events into one clean, searchable place so the right experience finds you first.',
  },
  {
    number: '02',
    tag: 'Step two',
    icon: ShieldCheck,
    title: 'Book',
    body: 'Help guests commit with confidence — clear ticket details, secure checkout, no second-guessing.',
  },
  {
    number: '03',
    tag: 'Step three',
    icon: UsersRound,
    title: 'Attend',
    body: 'Make entry smoother, faster, and frictionless — for guests and organizers alike.',
  },
];

const AboutPageClient = () => {
  return (
    <main className="overflow-hidden bg-white text-gray-900">

      {/* ── Hero ── */}
      <section className="relative bg-primary-950 px-4 py-20 text-white sm:px-6 lg:py-28">
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent-500/70 to-transparent" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-accent-400" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-accent-300">
                About Tickpass
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Built for better live experiences.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-8 text-primary-100 sm:text-xl"
            >
              Tickpass helps people discover, book, and attend events with less stress, while giving organizers a cleaner way to reach the right audience.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/25"
              >
                Discover Events
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/createEvent"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:border-accent-300 hover:bg-white/10"
              >
                Create Event
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md overflow-hidden rounded-lg border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/25 backdrop-blur">
              <div className="mb-5 flex items-center justify-between border-b border-white/15 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-300">
                    Digital ticket
                  </p>
                  <h2 className="mt-2 text-2xl font-black">Experience Pass</h2>
                </div>
                <TicketCheck className="h-10 w-10 text-accent-300" />
              </div>

              <div className="space-y-4">
                {[
                  ['Event', 'Lagos Creative Night'],
                  ['Status', 'Confirmed'],
                  ['Access', 'QR verified'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-5">
                    <span className="text-sm text-primary-200">{label}</span>
                    <span className="text-right text-sm font-bold text-white">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-5 gap-2">
                {Array.from({ length: 20 }).map((_, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0.25 }}
                    animate={{ opacity: [0.25, 1, 0.45] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: index * 0.04,
                      ease: 'easeInOut',
                    }}
                    className="h-8 rounded bg-white"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 px-8 py-20 sm:px-6 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
          variants={stagger}
          className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3"
        >
          {impactStats.map((stat) => (
            <motion.div
              key={stat.value}
              variants={fadeUp}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <p className="text-4xl font-black tracking-tight text-primary-950">{stat.value}</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Why we exist ── */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.22em] text-accent-600">
              Why we exist
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black tracking-tight text-primary-950 sm:text-5xl">
              Event discovery should feel exciting, not exhausting.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={stagger}
            className="space-y-4"
          >
            {problems.map((problem, index) => (
              <motion.div
                key={problem}
                variants={fadeUp}
                className="flex gap-5 rounded-lg border border-gray-200 bg-white p-5 transition duration-300 hover:border-accent-300 hover:shadow-xl hover:shadow-primary-950/5"
              >
                <span className="text-sm font-black text-accent-600">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-lg font-semibold leading-7 text-primary-950">{problem}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mission (redesigned) ── */}
      <section className="relative overflow-hidden bg-primary-950 px-4 py-20 sm:px-6 lg:py-24">

        {/* Grid lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* Eyebrow + headline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-3">
              <span className="h-px w-7 bg-accent-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-accent-400">
                Our mission
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mb-14 max-w-xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl"
            >
              Make every great occasion easier to{' '}
              <em className="not-italic text-accent-400">find, book,</em>{' '}
              and remember.
            </motion.h2>
          </motion.div>

          {/* Pillars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={stagger}
            className="grid gap-px sm:grid-cols-3"
          >
            {missionPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  className="group relative overflow-hidden border border-white/[0.08] bg-white/[0.03] p-8 transition-colors duration-300 hover:border-accent-500/40 hover:bg-accent-500/[0.06]"
                >
                  {/* Decorative number */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-3 select-none text-[96px] font-black leading-none tracking-tighter text-white/[0.05] transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-105 group-hover:text-accent-500/[0.15]"
                  >
                    {pillar.number}
                  </span>

                  {/* Step tag */}
                  <span className="mb-5 inline-block translate-y-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-accent-400 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {pillar.tag}
                  </span>

                  {/* Icon */}
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 group-hover:border-accent-500 group-hover:bg-accent-500/10 group-hover:text-accent-400">
                    <Icon className="h-[18px] w-[18px]" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3.5 text-[26px] font-black leading-none tracking-tight text-white">
                    {pillar.title}
                  </h3>

                  {/* Body */}
                  <p className="text-sm leading-[1.75] text-white/45 transition-colors duration-300 group-hover:text-white/65">
                    {pillar.body}
                  </p>

                  {/* Sweep line */}
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-500 transition-all duration-500 ease-out group-hover:w-full" />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Editorial strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-px flex flex-col items-start justify-between gap-4 border border-accent-500/[0.18] bg-accent-500/[0.05] px-7 py-5 sm:flex-row sm:items-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/30">
              Tickpass / Mission
            </span>
            <p className="max-w-sm text-xs italic leading-relaxed text-white/45 sm:text-right sm:text-sm">
              Built for the people who make{' '}
              <strong className="font-semibold not-italic text-white/80">nights out possible</strong>{' '}
              — and those who show up for them.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── Our story ── */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35 }}
            variants={stagger}
            className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          >
            <motion.div variants={fadeUp}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-600">
                Our story
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-primary-950 sm:text-5xl">
                We are building for the people who make nights out possible.
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-lg leading-8 text-gray-600">
              Tickpass was shaped by a simple belief: memorable events deserve better access. Whether it is a concert, conference, dinner party, worship gathering, comedy night, or workshop, people should be able to move from interest to attendance without friction.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={stagger}
            className="mt-12 grid gap-4 lg:grid-cols-2"
          >
            {audiences.map((audience) => (
              <motion.article
                key={audience.title}
                variants={fadeUp}
                className="rounded-lg border border-gray-200 bg-gray-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:bg-white hover:shadow-xl hover:shadow-primary-950/8"
              >
                <h3 className="text-2xl font-black text-primary-950">{audience.title}</h3>
                <p className="mt-4 leading-7 text-gray-600">{audience.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {audience.points.map((point) => (
                    <span
                      key={point}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-primary-800 ring-1 ring-gray-200"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent-600" />
                      {point}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35 }}
            variants={stagger}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.22em] text-accent-600">
              Our values
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black tracking-tight text-primary-950 sm:text-5xl">
              The standards behind the platform.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={stagger}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="rounded-lg border border-gray-200 bg-white p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-black text-primary-950">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{value.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Community focus ── */}
      <section className="px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.22em] text-accent-600">
              Community focus
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black tracking-tight text-primary-950 sm:text-5xl">
              A home for the experiences people actually talk about.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-lg leading-8 text-gray-600">
              Tickpass is made for the mix of occasions that shape real social life: loud, quiet, professional, spiritual, cultural, creative, and everything in between.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={stagger}
            className="flex flex-wrap gap-3"
          >
            {experienceTypes.map((type) => (
              <motion.span
                key={type}
                variants={fadeUp}
                className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-primary-950 shadow-sm"
              >
                {type}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 pb-20 sm:px-6 lg:pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
          variants={stagger}
          className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-primary-950 p-8 text-white sm:p-10 lg:p-12"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.22em] text-accent-300">
            Ready when you are
          </motion.p>
          <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <motion.h2 variants={fadeUp} className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Find your next event or create one people will remember.
            </motion.h2>
            <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-600"
              >
                Discover Events
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/createEvent"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Create Event
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </main>
  );
};

export default AboutPageClient;