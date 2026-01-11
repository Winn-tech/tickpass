'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import 'tailwind-scrollbar-hide';
import { clientEvents } from '@shared/types/eventTypes';
import {
  formattedDate,
  formattedLocation,
  generateSlug,
} from '../utils/eventsReusableFunctions';

interface TrendingEventsProps {
  events: clientEvents[];
  onEventClick?: (eventId: string) => void;
  onGetTickets?: (eventId: string) => void;
  onViewAll?: () => void;
}

const TrendingEvents: React.FC<TrendingEventsProps> = ({
  events,
  onEventClick,
  onGetTickets,
  onViewAll,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } =
      scrollContainerRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const amount = scrollContainerRef.current.clientWidth * 0.8;

    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const getEventPrice = (event: clientEvents) => {
    if (event.basePrice === 0) return 0;
    return event.basePrice ?? 'Free';
  };

  const eventTitle = (title: string) => {
    return title.length > 26 ? title.slice(0, 25) + '...' : title;
  };

  useEffect(() => {
    checkScrollButtons();
  }, [events]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold md:font-extrabold text-primary-950">
            Trending Now
          </h2>
          <p className="text-accent-700 font-bold mt-4 text-shadow-accent-100 text-shadow-md">
            Don&apos;t miss out on these amazing events
          </p>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          style={{ scrollbarWidth: 'none' }}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {events.map((event) => {
            if (!event._id) return null;

            const price = getEventPrice(event);
            const date = event.startDate
              ? formattedDate(event.startDate)
              : '';
            const location = event.location
              ? formattedLocation(event.location)
              : '';
              if (!event._id || !event.title) return null;

            const slug = generateSlug(event.title);

            return (
              <Link
                key={event._id}
                href={`/events/${slug}?id=${event._id}`}
                className="shrink-0 w-[85%] md:w-[33%] lg:w-[25%] snap-start cursor-pointer"
              >
                <div
                  onClick={() => onEventClick?.(event._id!)}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                >
                  
                  <div className="relative aspect-3/4 bg-gray-200">
                    <img
                      src={event.imageUrl || '/placeholder.jpg'}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                 
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg line-clamp-2">
                      {eventTitle(event.title)}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {date} • {event.time}
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-1">
                      {event.venue}, {location}
                    </p>

                    <div className="flex items-center justify-between pt-3">
                      <span className="text-xl font-bold text-accent-700">
                        {price === 0 ? 'Free' : `₦${price}`}
                      </span>

                     <Link
                        href={`/events/${slug}?id=${event._id}`}
                        className="px-4 py-2 rounded-full text-sm font-semibold bg-accent-500 text-white hover:bg-accent-600 cursor-pointer inline-block"
                      >
                        Get Tickets
                    </Link>

                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onViewAll}
            className="font-bold text-primary-600 hover:text-primary-700"
          >
            View All Events →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingEvents;