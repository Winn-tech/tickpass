// services/eventService.ts
import { prisma } from '../utils/prisma';
import { Prisma } from '@prisma/client';
import { CreateEventDto, UpdateEventDto, ITicketClass } from '../../shared/types/eventTypes';

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const computeTotalSold = (ticketClasses: ITicketClass[]): number => {
  return ticketClasses.reduce((sum, tc) => sum + (tc.sold ?? 0), 0);
};

export const computeTotalCapacity = (ticketClasses: ITicketClass[]): number => {
  return ticketClasses.reduce((sum, tc) => sum + tc.capacity, 0);
};

const computeBasePrice = (ticketClasses: ITicketClass[]): number => {
  const prices = ticketClasses.map((tc) => tc.price).filter((p) => !isNaN(p));
  return Math.min(...prices);
};

const validateTicketClasses = (ticketClasses: ITicketClass[]): void => {
  for (const tc of ticketClasses) {
    const sold = tc.sold ?? 0;
    if (sold > tc.capacity) {
      throw new Error(`${tc.name}: sold tickets cannot exceed capacity`);
    }
  }
};

// ─── Enrich ───────────────────────────────────────────────────────────────────

 export const enrichEvent = (event: any) => {
  return {
    ...event,
    totalSold: computeTotalSold(event.ticketClasses),
    totalCapacity: computeTotalCapacity(event.ticketClasses),
  };
};

// ─── Service Functions ────────────────────────────────────────────────────────

export const createEventService = async (data: CreateEventDto) => {
  validateTicketClasses(data.ticketClasses);
  const basePrice = computeBasePrice(data.ticketClasses);

  const event = await prisma.event.create({
    data: {
      title: data.title.toLowerCase().trim(),
      description: data.description.trim(),
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      time: data.time,
      venue: data.venue.trim(),
      category: data.category.trim(),
      imageUrl: data.imageUrl as string ?? '',
      tags: data.tags ?? [],
      isActive: true,
      basePrice,
      locationAddress: data.locationAddress.trim(),
      locationCity: data.locationCity.trim(),
      locationState: data.locationState.trim(),
      locationZipCode: data.locationZipCode.trim(),
      organizerName: data.organizerName.trim(),
      organizerEmail: data.organizerEmail.toLowerCase().trim(),
      organizerPhone: data.organizerPhone.trim(),
      ticketClasses: {
        create: data.ticketClasses.map((tc) => ({
          name: tc.name.trim(),
          price: tc.price,
          capacity: tc.capacity,
          sold: tc.sold ?? 0,
        })),
      },
    },
    include: { ticketClasses: true },
  });

  return enrichEvent(event);
};

export const updateEventService = async (id: string, data: UpdateEventDto) => {
  if (data.ticketClasses) {
    validateTicketClasses(data.ticketClasses);
  }

  const { ticketClasses, imageUrl, startDate, endDate, ...rest } = data;

  // sanitize fields that have type mismatches between IEvent and Prisma
  const scalarFields = {
    ...rest,
    ...(startDate && { startDate: new Date(startDate) }),
    ...(endDate && { endDate: new Date(endDate) }),
    ...(imageUrl && typeof imageUrl === 'string' && { imageUrl }), 
  };

  const event = await prisma.event.update({
    where: { id },
    data: {
      ...scalarFields,
      ...(ticketClasses && {
        basePrice: computeBasePrice(ticketClasses),
        ticketClasses: {
          deleteMany: {},
          create: ticketClasses.map((tc) => ({
            name: tc.name.trim(),
            price: tc.price,
            capacity: tc.capacity,
            sold: tc.sold ?? 0,
          })),
        },
      }),
    },
    include: { ticketClasses: true },
  });

  return enrichEvent(event);
};
export const deleteEventService = async (id: string) => {
  return await prisma.event.delete({
    where: { id },
  });
};

export const getSingleEventService = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
    include: { ticketClasses: true },
  });

  if (!event) return null;
  return enrichEvent(event);
};

export const getTicketDetailsService = async (id: string) => {
  return await prisma.event.findUnique({
    where: { id },
    select: {
      title: true,
      ticketClasses: true,
    },
  });
};

export const getMonthlyStatsService = async (year: number) => {
  const events = await prisma.event.findMany({
    where: {
      startDate: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      },
    },
    select: {
      title: true,
      startDate: true,
    },
  });

  const grouped: Record<number, { month: number; numEvents: number; createdEvents: string[] }> = {};

  for (const event of events) {
    const month = event.startDate.getMonth() + 1;
    if (!grouped[month]) {
      grouped[month] = { month, numEvents: 0, createdEvents: [] };
    }
    grouped[month].numEvents += 1;
    grouped[month].createdEvents.push(event.title);
  }

  return Object.values(grouped).sort((a, b) => a.month - b.month);
};