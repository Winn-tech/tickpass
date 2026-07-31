import React, { Suspense } from 'react';
import CategoriesSlidder from '../../_components/categoriesSlidder';
import Events from '../../_components/events';

import { EventFilters } from '@shared/types/eventTypes';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface EventsPageProps {
  searchParams: Promise<EventFilters>;
}

const EventsPage = async ({
  searchParams,
}: EventsPageProps) => {
  const params = await searchParams;

  return (
    <section>
      <CategoriesSlidder />

      <Suspense>
        <Events params={params} />
      </Suspense>
    </section>
  );
};

export default EventsPage;