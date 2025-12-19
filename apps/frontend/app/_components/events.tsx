import { getEvents } from '@/app/utils/eventsApi';
import Filter from './filter'
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { clientEvents } from "@shared/types/eventTypes";
import { generateSlug } from '@/app/utils/eventsReusableFunctions';


const EventCard = ({ event }: { event: clientEvents }) => {
  const slug = generateSlug(event.title || "");

  return (
    <Link href={`/events/${slug}?id=${event._id}`} className="block">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex">
          <div className="flex-1 p-6">
            <h3 className="text-xl font-bold mb-4 uppercase">{event.title}</h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{event.startDate?.toString()}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{event.location?.city}, {event.location?.state}</span>
              </div>
            </div>

            <div className="text-2xl font-bold text-orange-500">
              {event.basePrice ? `₦${event.basePrice}` : "Free"}
            </div>
          </div>

          <div className="w-40 shrink-0 relative h-40">
            <Image
              src={event.imageUrl || "/placeholder.jpg"}
              alt={event.title || "Event Image"}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};


const Events = async () => {
  const eventList = await getEvents();

  // ✅ Validate the API response BEFORE mapping
  if (!eventList || !Array.isArray(eventList.events)) {
    return (
      <section className="py-15 bg-gray-50">
        <div className="container mx-auto px-6 mb-4">
          <h2 className="text-4xl font-bold text-primary-900 mb-3 text-center">
            Discover Events
          </h2>

          <p className="text-center text-gray-600">No events available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-15 bg-gray-50">
      <div className="container mx-auto px-6 mb-4">
        <h2 className="text-4xl font-bold text-primary-900 mb-3 text-center">
          Discover Events
        </h2>

        <Filter />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {eventList.events.map((event:clientEvents) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
