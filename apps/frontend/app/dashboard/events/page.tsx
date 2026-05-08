import Link from 'next/link';
import { CalendarX2, Filter, Plus } from 'lucide-react';
import DashboardEmptyState from '../_components/dashboardEmptyState';
import DashboardPanel from '../_components/dashboardPanel';

const tabs = ['All Events', 'Published', 'Drafts', 'Ended'];

export default function DashboardEventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-primary-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">Organizer Events</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-primary-950">Events</h2>
          <p className="mt-2 text-sm text-gray-500">
            Monitor your published, draft, and completed events in one curated workspace.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-2xl border border-primary-100 bg-white px-4 py-3 text-sm font-semibold text-primary-900 transition hover:bg-primary-50">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto border-b border-primary-100 pb-3">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`relative whitespace-nowrap pb-2 text-sm font-semibold ${
              index === 0 ? 'text-accent-700' : 'text-gray-500 hover:text-primary-900'
            }`}
          >
            {tab}
            {index === 0 ? <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent-500" /> : null}
          </button>
        ))}
      </div>

      <DashboardPanel title="No events yet" eyebrow="Empty State">
        <DashboardEmptyState
          icon={<CalendarX2 className="h-8 w-8" />}
          title="You have no events yet"
          description="Click the button below to create your first event and start filling this dashboard with sales, scans, and audience momentum."
          action={
            <Link
              href="/createEvent"
              className="inline-flex items-center gap-2 rounded-2xl bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              <Plus className="h-4 w-4" />
              Add new event
            </Link>
          }
        />
      </DashboardPanel>
    </div>
  );
}
