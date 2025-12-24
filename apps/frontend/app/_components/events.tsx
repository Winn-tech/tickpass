import { getEvents } from '@/app/utils/eventsApi';
import Filter from './filter'
import EventCard from './eventsCard';
import { clientEvents, EventFilters } from "@shared/types/eventTypes";
import NoEventsCalendar from '@/app/_components/noEventsCalendar'

interface EventsPageProps {
  searchParams: EventFilters;
}
interface EventsProps {
  events: clientEvents[];
}

const Events: React.FC<EventsProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
       <section className='p-6'>
        <Filter />
      <div className="flex flex-col items-center justify-center py-16">
        <NoEventsCalendar className="w-56 h-56 text-primary-300" />
        <p className="mt-4 text-accent-500 text-sm">
          No events found for this category
        </p>
      </div>
    </section>
    );
  }

  return (
    <section className='p-6'>
        <Filter />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-6'>
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default Events;