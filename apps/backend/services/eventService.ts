import { prisma } from '../utils/prisma';
import { Prisma } from '@prisma/client';
import {
  CreateEventDto,
  UpdateEventDto,
  ITicketClass,
  OrganizerEventStatusFilter,
} from '../../shared/types/eventTypes';

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
      imageUrl: (data.imageUrl as string) ?? '',
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

// ─── Organizer dashboard ──────────────────────────────────────────────────────

// SINGLE SOURCE OF TRUTH for the "ended" boundary.
// Both deriveEventStatus (labels an already-fetched event) and
// buildOrganizerStatusWhere (filters at the DB level) read from this —
// so they can never drift apart.
//
// Right now an event ends exactly at its endDate. If you ever want a grace
// period (e.g. events stay "published" for 24h after endDate so organizers
// can still check people in), change ONLY this function:
//   return new Date(now.getTime() - 24 * 60 * 60 * 1000);
const getEndedCutoff = (now: Date): Date => {
  return now;
};

export const deriveEventStatus = (
  event: { isActive: boolean; endDate: Date },
  now: Date = new Date()
): 'published' | 'draft' | 'ended' => {
  if (!event.isActive) return 'draft';
  const cutoff = getEndedCutoff(now);
  return event.endDate < cutoff ? 'ended' : 'published';
};

const buildOrganizerStatusWhere = (
  status: OrganizerEventStatusFilter,
  now: Date
): Prisma.EventWhereInput => {
  const cutoff = getEndedCutoff(now);

  switch (status) {
    case 'published':
      return { isActive: true, endDate: { gte: cutoff } };
    case 'draft':
      return { isActive: false };
    case 'ended':
      return { isActive: true, endDate: { lt: cutoff } };
    case 'all':
    default:
      return {};
  }
};

interface GetOrganizerEventsOptions {
  status: OrganizerEventStatusFilter;
  page: number;
  limit: number;
}

export const getOrganizerEventsService = async (
  organizerId: string,
  { status, page, limit }: GetOrganizerEventsOptions
) => {
  const now = new Date();
  const cutoff = getEndedCutoff(now);
  const baseWhere: Prisma.EventWhereInput = { createdBy: organizerId };
  const where: Prisma.EventWhereInput = { ...baseWhere, ...buildOrganizerStatusWhere(status, now) };

  const [events, totalCount, allCount, publishedCount, draftCount, endedCount] = await Promise.all([
    prisma.event.findMany({
      where,
      include: { ticketClasses: true },
      orderBy: { startDate: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.event.count({ where }),
    prisma.event.count({ where: baseWhere }),
    prisma.event.count({ where: { ...baseWhere, isActive: true, endDate: { gte: cutoff } } }),
    prisma.event.count({ where: { ...baseWhere, isActive: false } }),
    prisma.event.count({ where: { ...baseWhere, isActive: true, endDate: { lt: cutoff } } }),
  ]);

  const enrichedEvents = events.map((event) => ({
    ...enrichEvent(event),
    status: deriveEventStatus(event, now),
  }));

  return {
    events: enrichedEvents,
    counts: { all: allCount, published: publishedCount, draft: draftCount, ended: endedCount },
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.max(1, Math.ceil(totalCount / limit)),
    },
  };
};