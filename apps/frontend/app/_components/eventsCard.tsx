import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { generateSlug } from '@/app/utils/eventsReusableFunctions';
import { clientEvents, EventFilters } from "@shared/types/eventTypes";


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
              src={typeof event.imageUrl === 'string' ? event.imageUrl : "/placeholder.jpg"}
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

export default EventCard;
