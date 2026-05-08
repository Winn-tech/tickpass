import { CreateEventDto, EventFilters } from '@shared/types/eventTypes';

const baseApi =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api/v1'
    : '/api/v1';

export const getEvents = async (filters: EventFilters = {}) => {
  const params = new URLSearchParams();

  if (filters.category && filters.category !== 'All events') {
    params.set('category', filters.category);
  }

  if (filters.minPrice !== undefined) {
    params.set('minPrice', filters.minPrice.toString());
  }

  if (filters.maxPrice !== undefined) {
    params.set('maxPrice', filters.maxPrice.toString());
  }

  if (filters.date) {
    params.set('date', filters.date);
  }

  if (filters.startDate) {
    params.set('startDate', filters.startDate);
  }

  if (filters.endDate) {
    params.set('endDate', filters.endDate);
  }

  if (filters.page) {
    params.set('page', filters.page.toString());
  }

  const query = params.toString();
  const url = !query ? `${baseApi}/events` :`${baseApi}/events?${query}` ;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }

  return res.json();
};


export const getSingleEvent = async (id:string)=>{
   const response = await fetch(`${baseApi}/events/${id}`)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const event = await response.json();
  return event;
}

export const createEvent = async (eventData: CreateEventDto) => {
  console.log(eventData);
  try {
    const response = await fetch(`${baseApi}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to create event: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export const getTicketDetails = async (eventId: string) => {
  const response = await fetch(`${baseApi}/events/${eventId}/tickets`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};
