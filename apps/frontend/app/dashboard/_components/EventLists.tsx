import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Ticket } from 'lucide-react';
import EventStatusBadge from '../_components/EventsStatusBadge';
import type { OrganizerEventSummary } from '@shared/types/eventTypes';

function formatDateRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const sameDay = start.toDateString() === end.toDateString();
  const formatter = new Intl.DateTimeFormat('en-NG', { month: 'short', day: 'numeric', year: 'numeric' });

  return sameDay ? formatter.format(start) : `${formatter.format(start)} – ${formatter.format(end)}`;
}

export default function EventsList({ events }: { events: OrganizerEventSummary[] }) {
  return (
    <ul className="divide-y divide-primary-100">
      {events.map((event) => {
        const percentSold =
          event.totalCapacity > 0 ? Math.round((event.totalSold / event.totalCapacity) * 100) : 0;

        return (
          <li key={event.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-primary-50">
                {event.imageUrl ? (
                  <Image src={event.imageUrl} alt="" fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-primary-300">
                    <Ticket className="h-6 w-6" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-primary-950">{event.title}</h3>
                  <EventStatusBadge status={event.status} />
                </div>
                <p className="mt-1 text-xs text-gray-500">{formatDateRange(event.startDate, event.endDate)}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="h-3 w-3" />
                  {event.venue}, {event.locationCity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 sm:justify-end">
              <div className="text-right">
                <p className="text-sm font-semibold text-primary-950">
                  {event.totalSold}/{event.totalCapacity}
                </p>
                <p className="text-xs text-gray-400">{percentSold}% sold</p>
              </div>

              <Link
                href={`/dashboard/events/${event.id}`}
                className="rounded-xl border border-primary-100 px-3 py-2 text-xs font-semibold text-primary-900 transition hover:bg-primary-50"
              >
                Manage
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}