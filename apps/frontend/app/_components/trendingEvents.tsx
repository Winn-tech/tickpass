'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import Link from 'next/link';
import { clientEvents } from '@shared/types/eventTypes';
import {
  formattedDate,
  generateSlug,
  getEventId,
  getEventLocation,
} from '../utils/eventsReusableFunctions';

interface TrendingEventsProps {
  events: clientEvents[];
  onEventClick?: (eventId: string) => void;
  onViewAll?: () => void;
}

const TrendingEvents: React.FC<TrendingEventsProps> = ({
  events,
  onEventClick,
  onViewAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const getEventPrice = (event: clientEvents) => {
    if (event.basePrice === 0) return 0;
    return event.basePrice ?? 'Free';
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === 'right' ? 380 : -380,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:py-24">
      <style>{`
        .trending-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .trending-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 56px;
          gap: 32px;
        }

        .trending-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .trending-eyebrow-line {
          width: 32px;
          height: 1px;
          background: #fb8c00;
        }

        .trending-eyebrow-text {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fb8c00;
        }

        .trending-title {
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 800;
          color: #0d1452;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .trending-title em {
          font-style: normal;
          color: #fb8c00;
        }

        .trending-header-right {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 6px;
        }

        .nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(63, 81, 181, 0.2);
          background: transparent;
          color: #3949ab;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-size: 16px;
        }

        .nav-btn:hover {
          background: #0d1452;
          color: #fff;
          border-color: #0d1452;
          transform: scale(1.05);
        }

        .view-all-btn {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #303f9f;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0;
          transition: color 0.25s ease;
          margin-left: 8px;
        }

        .view-all-btn::after {
          content: '';
          display: block;
          width: 24px;
          height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }

        .view-all-btn:hover {
          color: #fb8c00;
        }

        .view-all-btn:hover::after {
          width: 40px;
        }

        .scroll-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 4px;
        }

        .scroll-track::-webkit-scrollbar {
          display: none;
        }

        .event-card-link {
          flex-shrink: 0;
          width: 320px;
          scroll-snap-align: start;
          text-decoration: none;
          display: block;
        }

        .event-card {
          position: relative;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition:
            transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            border-color 0.35s ease,
            box-shadow 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .event-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 152, 0, 0.4);
          box-shadow:
            0 24px 56px rgba(13, 20, 82, 0.12),
            0 0 0 1px rgba(255, 152, 0, 0.2);
        }

        .card-image-wrap {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #c5cae9;
        }

        .card-image-wrap img {
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }

        .event-card:hover .card-image-wrap img {
          transform: scale(1.06) !important;
        }

        .card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(13, 20, 82, 0.25) 70%,
            rgba(13, 20, 82, 0.65) 100%
          );
          z-index: 1;
        }

        .card-price-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0d1452;
          background: #ffa726;
          padding: 5px 10px;
          border-radius: 4px;
          transform: translateY(-4px);
          opacity: 0;
          transition:
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity 0.3s ease;
        }

        .event-card:hover .card-price-badge {
          transform: translateY(0);
          opacity: 1;
        }

        .card-body {
          padding: 20px 20px 22px;
          position: relative;
          background: #ffffff;
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .card-meta-text {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f57c00;
          font-weight: 700;
        }

        .card-meta-dot {
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: rgba(245, 124, 0, 0.4);
          flex-shrink: 0;
        }

        .card-title {
          font-size: 18px;
          font-weight: 800;
          color: #0d1452;
          line-height: 1.3;
          margin: 0 0 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          letter-spacing: -0.01em;
          transition: color 0.25s ease;
        }

        .event-card:hover .card-title {
          color: #283593;
        }

        .card-location {
          font-size: 12px;
          color: #757575;
          letter-spacing: 0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 18px;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid #eeeeee;
        }

        .card-price {
          font-size: 20px;
          font-weight: 800;
          color: #303f9f;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .card-price span {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          vertical-align: super;
          margin-right: 1px;
        }

        .card-price.free {
          color: #f57c00;
        }

        .card-number {
          position: absolute;
          top: -10px;
          left: 20px;
          font-size: 60px;
          font-weight: 800;
          color: rgba(13, 20, 82, 0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          transition: color 0.4s ease;
        }

        .event-card:hover .card-number {
          color: rgba(255, 167, 38, 0.1);
        }

        .card-cta {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #fff;
          background: #3949ab;
          border: none;
          padding: 9px 14px;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          white-space: nowrap;
          transition:
            background 0.25s ease,
            transform 0.2s ease,
            letter-spacing 0.3s ease;
        }

        .event-card:hover .card-cta {
          background: #fb8c00;
          transform: scale(1.02);
          letter-spacing: 0.18em;
        }

        @media (max-width: 768px) {
          .trending-section {
            padding: 64px 0 56px;
          }

          .trending-inner {
            padding: 0;
          }

          .event-card-link {
            width: 80vw;
          }

          .trending-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            margin-bottom: 36px;
          }

          .trending-header-right {
            width: 100%;
          }

          .view-all-btn {
            margin-left: auto;
          }
        }
      `}</style>

      <div className="trending-inner">
        <div className="trending-header">
          <div>
            <div className="trending-eyebrow">
              <div className="trending-eyebrow-line" />
              <span className="trending-eyebrow-text">Featured Events</span>
            </div>

            <h2 className="trending-title">
              Trending <em>Now</em>
            </h2>
          </div>

          <div className="trending-header-right">
            <button
              className="nav-btn"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              type="button"
            >
              ←
            </button>

            <button
              className="nav-btn"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              type="button"
            >
              →
            </button>

            <button
              className="view-all-btn"
              onClick={onViewAll}
              type="button"
            >
              View All
            </button>
          </div>
        </div>

        <div className="scroll-track" ref={scrollRef}>
          {events?.map((event, index) => {
            const eventId = getEventId(event);
            if (!eventId || !event.title) return null;

            const price = getEventPrice(event);
            const date = event.startDate ? formattedDate(event.startDate) : '';
            const location = getEventLocation(event);
            const slug = generateSlug(event.title);
            const priceLabel =
              price === 0 ? 'Free' : `₦${Number(price).toLocaleString()}`;
            const cardNum = String(index + 1).padStart(2, '0');

            return (
              <Link
                key={eventId}
                href={`/events/${slug}?id=${eventId}`}
                className="event-card-link"
              >
                <div
                  className="event-card"
                  onClick={() => onEventClick?.(eventId)}
                >
                  <div className="card-image-wrap">
                    <Image
                      src={
                        typeof event.imageUrl === 'string'
                          ? event.imageUrl
                          : '/placeholder.jpg'
                      }
                      alt={event.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />

                    <div className="card-image-overlay" />
                    <div className="card-price-badge">{priceLabel}</div>
                  </div>

                  <div className="card-body">
                    <div className="card-number">{cardNum}</div>

                    <div className="card-meta">
                      {date && <span className="card-meta-text">{date}</span>}

                      {date && event.time && <div className="card-meta-dot" />}

                      {event.time && (
                        <span className="card-meta-text">{event.time}</span>
                      )}
                    </div>

                    <h3 className="card-title">{event.title}</h3>

                    <p className="card-location">
                      {event.venue}
                      {location ? `, ${location}` : ''}
                    </p>

                    <div className="card-footer">
                      <div className={`card-price${price === 0 ? ' free' : ''}`}>
                        {price === 0 ? (
                          'Free'
                        ) : (
                          <>
                            <span>₦</span>
                            {Number(price).toLocaleString()}
                          </>
                        )}
                      </div>

                      <span className="card-cta">
                        Get Tickets
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingEvents;
