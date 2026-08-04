import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarX2, Filter, Plus } from 'lucide-react';
import DashboardEmptyState from '../_components/dashboardEmptyState';
import DashboardPanel from '../_components/dashboardPanel';
import EventsTabs from '../_components/eventsTabs';
import EventsList from '../_components/EventLists';
import EventsPagination from '../_components/EventsPagination';
import { getOrganizerEvents } from '../_lib/api/organizersEvents.server';
import type { OrganizerEventStatusFilter } from '@shared/types/eventTypes';

export const metadata: Metadata = { title: 'Events · Organizer Dashboard' };

const VALID_STATUSES: OrganizerEventStatusFilter[] = ['all', 'published', 'draft', 'ended'];

function parseStatus(value?: string): OrganizerEventStatusFilter {
  return VALID_STATUSES.includes(value as OrganizerEventStatusFilter)
    ? (value as OrganizerEventStatusFilter)
    : 'all';
}

function parsePage(value?: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
}

interface DashboardEventsPageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function DashboardEventsPage({ searchParams }: DashboardEventsPageProps) {
  const resolvedParams = await searchParams;
  const status = parseStatus(resolvedParams.status);
  const page = parsePage(resolvedParams.page);

  const { events, counts, pagination } = await getOrganizerEvents({ status, page });
  const isEmpty = events.length === 0;

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

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-2xl border border-primary-100 bg-white px-4 py-3 text-sm font-semibold text-primary-900 transition hover:bg-primary-50"
        >
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <EventsTabs activeStatus={status} counts={counts} />

      {isEmpty ? (
        <DashboardPanel title="No events yet" eyebrow="Empty State">
          <DashboardEmptyState
            icon={<CalendarX2 className="h-8 w-8" />}
            title={status === 'all' ? 'You have no events yet' : `No ${status} events`}
            description={
              status === 'all'
                ? 'Click the button below to create your first event and start filling this dashboard with sales, scans, and audience momentum.'
                : 'Try a different tab, or create a new event to get started.'
            }
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
      ) : (
        <DashboardPanel
          title="Your events"
          eyebrow={`${pagination.totalCount} total`}
          action={
            <Link
              href="/createEvent"
              className="inline-flex items-center gap-2 rounded-2xl bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              <Plus className="h-4 w-4" />
              New event
            </Link>
          }
        >
          <EventsList events={events} />
        </DashboardPanel>
      )}

      {!isEmpty && pagination.totalPages > 1 ? (
        <EventsPagination pagination={pagination} status={status} />
      ) : null}
    </div>
  );
}