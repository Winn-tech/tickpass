import Link from 'next/link';
import {
  ArrowUpRight,
  CalendarDays,
  ChartNoAxesColumn,
  CircleDollarSign,
  Clock3,
  Plus,
  QrCode,
  Ticket,
} from 'lucide-react';
import DashboardMetricCard from './_components/dashboardMetricCard';
import DashboardPanel from './_components/dashboardPanel';
import { dashboardMetrics, dashboardSummary, recentActivity, checklist } from './_lib/mockDashboard';

const activityIcon = (type: string) => {
  if (type === 'sale') return <ChartNoAxesColumn className="h-4 w-4" />;
  if (type === 'scan') return <QrCode className="h-4 w-4" />;
  return <Clock3 className="h-4 w-4" />;
};

export default function DashboardPage() {
  const soldPct =
    (dashboardSummary.upcomingEvent.sold / dashboardSummary.upcomingEvent.capacity) * 100;

  return (
    <div className="space-y-6">

      {/* ── Top row: balance + upcoming event ──────────────────────── */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">

        {/* Balance panel */}
        <DashboardPanel
          eyebrow="Organizer Pulse"
          title="Revenue Snapshot"
          action={
            <Link
              href="/dashboard/settlements"
              className="text-sm font-semibold text-accent-700 transition hover:text-accent-800"
            >
              View settlements
            </Link>
          }
        >
          {/* Balance figure */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-400">
                Available balance
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-primary-950">
                {dashboardSummary.walletBalance}
              </p>
            </div>
            <span className="mt-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              +18.2%
            </span>
          </div>

          {/* Sub-stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-4">
              <p className="text-xs font-medium text-gray-400">Pending settlement</p>
              <p className="mt-2 text-lg font-semibold text-primary-950">
                {dashboardSummary.pendingSettlement}
              </p>
            </div>
            <div className="rounded-2xl border border-primary-100 bg-primary-50/60 p-4">
              <p className="text-xs font-medium text-gray-400">Projected payout</p>
              <p className="mt-2 text-lg font-semibold text-primary-950">
                {dashboardSummary.projectedPayout}
              </p>
            </div>
            <div className="col-span-2 rounded-2xl border border-primary-100 bg-primary-50/60 p-4 sm:col-span-1">
              <p className="text-xs font-medium text-gray-400">Tip</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Strong cover art and clear ticket tiers move faster than discount-heavy listings.
              </p>
            </div>
          </div>
        </DashboardPanel>

        {/* Upcoming event panel */}
        <DashboardPanel eyebrow="Next Up" title="Upcoming Event">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-primary-950">
                {dashboardSummary.upcomingEvent.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {dashboardSummary.upcomingEvent.date} · {dashboardSummary.upcomingEvent.time}
              </p>
              <p className="text-sm text-gray-400">{dashboardSummary.upcomingEvent.venue}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Ticket progress</span>
              <span className="font-semibold text-primary-950">
                {dashboardSummary.upcomingEvent.sold} / {dashboardSummary.upcomingEvent.capacity}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-primary-100">
              <div
                className="h-1.5 rounded-full bg-primary-800 transition-all"
                style={{ width: `${soldPct}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/dashboard/events"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-800"
            >
              Manage event
            </Link>
            <Link
              href="/dashboard/scan"
              className="inline-flex items-center gap-2 rounded-2xl border border-primary-100 px-4 py-2.5 text-sm font-semibold text-primary-900 transition hover:bg-primary-50"
            >
              Scan tools
            </Link>
          </div>
        </DashboardPanel>
      </div>

      {/* ── Metric strip ────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        <DashboardMetricCard
          label={dashboardMetrics[0].label}
          value={dashboardMetrics[0].value}
          delta={dashboardMetrics[0].delta}
          tone="accent"
          icon={<CircleDollarSign className="h-5 w-5" />}
        />
        <DashboardMetricCard
          label={dashboardMetrics[1].label}
          value={dashboardMetrics[1].value}
          delta={dashboardMetrics[1].delta}
          tone="primary"
          icon={<CalendarDays className="h-5 w-5" />}
        />
        <DashboardMetricCard
          label={dashboardMetrics[2].label}
          value={dashboardMetrics[2].value}
          delta={dashboardMetrics[2].delta}
          tone="success"
          icon={<Ticket className="h-5 w-5" />}
        />
        <DashboardMetricCard
          label={dashboardMetrics[3].label}
          value={dashboardMetrics[3].value}
          delta={dashboardMetrics[3].delta}
          tone="primary"
          icon={<QrCode className="h-5 w-5" />}
        />
      </div>

      {/* ── Bottom row: activity + focus ────────────────────────────── */}
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">

        {/* Activity panel */}
        <DashboardPanel
          eyebrow="Recent Activity"
          title="Sales & Check-ins"
          action={
            <Link
              href="/dashboard/ticket-sales"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 transition hover:text-accent-800"
            >
              Open report
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          }
        >
          <ul className="divide-y divide-primary-50">
            {recentActivity.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    {activityIcon(item.type)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary-950">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary-950">{item.value}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </DashboardPanel>

        {/* Weekly focus panel */}
        <DashboardPanel eyebrow="Momentum" title="Weekly Focus">
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl bg-primary-50/70 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-primary-950">{item.title}</p>
                  <span className="flex-shrink-0 rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-accent-700">
                    {item.badge}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-gray-500">{item.description}</p>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-5 rounded-2xl border border-dashed border-accent-200 bg-accent-50/40 p-5 text-center">
            <p className="text-sm font-medium text-primary-950">Ready to launch another?</p>
            <p className="mt-1 text-xs leading-5 text-gray-400">
              A new listing is live in minutes. Performance data flows here automatically.
            </p>
            <Link
              href="/createEvent"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              <Plus className="h-4 w-4" />
              Create event
            </Link>
          </div>
        </DashboardPanel>
      </div>

    </div>
  );
}