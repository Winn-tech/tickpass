import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CircleHelp, Plus } from 'lucide-react';
import DashboardPanel from '../_components/dashboardPanel';
import DashboardEmptyState from '../_components/dashboardEmptyState';

const sections: Record<string, { title: string; description: string }> = {
  'ticket-sales': {
    title: 'Ticket Sales',
    description:
      'Track ticket movement, revenue trends, and performance summaries across your upcoming and past events.',
  },
  scan: {
    title: 'Scan Tickets',
    description:
      'Prepare your check-in workflow, on-site validation tools, and entry operations for event day.',
  },
  'discount-codes': {
    title: 'Discount Codes',
    description:
      'Create promotional offers, monitor redemptions, and manage limited campaigns for your event audience.',
  },
  settlements: {
    title: 'Settlements',
    description:
      'Review pending payouts, processed withdrawals, and revenue that is ready to move to your balance.',
  },
  settings: {
    title: 'Settings',
    description:
      'Update account preferences, organizer details, and the operational information connected to your workspace.',
  },
};

export default async function DashboardSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const content = sections[section];

  if (!content) {
    notFound();
  }

  return (
    <DashboardPanel eyebrow="Scaffolded Route" title={content.title}>
      <DashboardEmptyState
        icon={<CircleHelp className="h-8 w-8" />}
        title={`${content.title} is ready for live data`}
        description={`${content.description} This page is already scaffolded so we can drop real backend wiring into it without redesigning the dashboard shell later.`}
        action={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/createEvent"
              className="inline-flex items-center gap-2 rounded-2xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              <Plus className="h-4 w-4" />
              Create Event
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-primary-100 bg-white px-5 py-3 text-sm font-semibold text-primary-900 transition hover:bg-primary-50"
            >
              Back to overview
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        }
      />
    </DashboardPanel>
  );
}
