import React, { Suspense } from 'react';
import CategoriesSlidder from '../_components/categoriesSlidder';
import Events from '../_components/events';
import { getEvents } from '@/app/utils/eventsApi';
import { EventFilters, clientEvents } from '@shared/types/eventTypes';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface EventsPageProps {
  searchParams: Promise<EventFilters>;
}

const EventsPage = async ({ searchParams }: EventsPageProps) => {
  const params = await searchParams;

  const eventList = await getEvents(params);

  const events: clientEvents[] = Array.isArray(eventList?.events)
    ? eventList.events
    : [];

  return (
    <section className=''>
      <CategoriesSlidder />
      <Suspense>
        <Events events={events} />
      </Suspense>
    </section>
  );
};

export default EventsPage;
