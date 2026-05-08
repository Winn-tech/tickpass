import { clientEvents, LegacyEventLocation } from '@shared/types/eventTypes';

type NewLocationShape = {
  locationAddress?: string;
  locationCity?: string;
  locationState?: string;
  locationZipCode?: string;
};

export const formattedDate = (date: string | Date) => {
  const eventDate = new Date(date);
  return eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formattedLocation = (location: string | LegacyEventLocation | NewLocationShape) => {
  if (typeof location === 'string') {
    return location;
  }

  if ('address' in location) {
    return `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`.trim();
  }

  return `${location.locationAddress ?? ''}, ${location.locationCity ?? ''}, ${location.locationState ?? ''} ${location.locationZipCode ?? ''}`
    .replace(/\s+/g, ' ')
    .replace(/\s+,/g, ',')
    .replace(/^,\s*/, '')
    .trim();
};

export const getEventId = (event: clientEvents) => event.id ?? event._id ?? '';

export const getEventLocation = (event: clientEvents) => {
  if (event.location) {
    return formattedLocation(event.location);
  }

  return formattedLocation({
    locationAddress: event.locationAddress,
    locationCity: event.locationCity,
    locationState: event.locationState,
    locationZipCode: event.locationZipCode,
  });
};

export const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
