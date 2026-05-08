'use client';
import React from 'react';
import Filter from './filter';
import EventCard from './eventsCard';
import NoEventsCalendar from '@/app/_components/noEventsCalendar';
import Link from 'next/link';
import { clientEvents } from '@shared/types/eventTypes';
import { useSearchParams } from 'next/navigation';
import { getEventId } from '../utils/eventsReusableFunctions';
interface EventsProps {
  events: clientEvents[];
}

const Events: React.FC<EventsProps> = ({ events }) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);

  if (!events || events.length === 0) {
    return (
      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <Filter />
          <div className="flex flex-col items-center justify-center py-16">
            <NoEventsCalendar />
            <p className="mt-4 text-accent-500 text-sm font-bold">
              No events found for this category
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <Filter />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {events.map((event) => (
            <EventCard key={getEventId(event) || event.title} event={event} />
          ))}
        </div>

        <Link href={`/events?page=${page + 1}`}>
          <div className="mt-6 flex justify-center cursor-pointer">
            <button className="bg-accent-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-accent-400">
              See More Events.
            </button>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Events;
