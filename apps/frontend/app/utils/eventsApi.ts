import { CreateEventDto } from './../../../shared/types/eventTypes';

const baseApi = 'http://localhost:4000/api/v1';

import { EventFilters } from '@shared/types/eventTypes';

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

  const query = params.toString();
  const url = query ? `${baseApi}/events?${query}` : `${baseApi}/events`;
  const res = await fetch(url);

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
  try {
    const response = await fetch(`${baseApi}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return error;
  }
}