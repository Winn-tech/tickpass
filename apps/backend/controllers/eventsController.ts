// controllers/eventsController.ts
import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import EventFeatures from '../utils/getEventFeatures';
import {
  createEventService,
  updateEventService,
  deleteEventService,
  getSingleEventService,
  getTicketDetailsService,
  getMonthlyStatsService,
  getOrganizerEventsService,
  enrichEvent,
} from '../services/eventService';
import { OrganizerEventStatusFilter } from '../../shared/types/eventTypes';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await createEventService(req.body);
    res.status(201).json({
      status: 'success',
      data: event,
    });
  } catch (error: any) {
    // unique constraint violation (duplicate ticket class name)
    if (error.code === 'P2002') {
      return res.status(409).json({
        status: 'error',
        message: 'Ticket class names must be unique within the event',
      });
    }
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message ?? 'Internal server error',
    });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const args = new EventFeatures(req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .build();

    const events = await prisma.event.findMany(args);

    // enrich each event with totalSold and totalCapacity
    const enriched = events.map((event) => enrichEvent(event));

    res.status(200).json({
      status: 'success',
      results: enriched.length,
      events: enriched,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message ?? 'Internal server error',
    });
  }
};

export const getSingleEvent = async (req: Request, res: Response) => {
  try {
    const event = await getSingleEventService(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: event,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message ?? 'Internal server error',
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await updateEventService(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: event,
    });
  } catch (error: any) {
    // record not found
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
      });
    }
    // unique constraint violation
    if (error.code === 'P2002') {
      return res.status(409).json({
        status: 'error',
        message: 'Ticket class names must be unique within the event',
      });
    }
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message ?? 'Internal server error',
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    await deleteEventService(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    // record not found
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
      });
    }
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message ?? 'Internal server error',
    });
  }
};

export const getTicketDetails = async (req: Request, res: Response) => {
  try {
    const data = await getTicketDetailsService(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message ?? 'Internal server error',
    });
  }
};

export const getMonthlyEventsStats = async (req: Request, res: Response) => {
  try {
    const year = parseInt(req.params.year);
    if (isNaN(year)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid year parameter',
      });
    }
    const stats = await getMonthlyStatsService(year);
    res.status(200).json({
      status: 'success',
      data: stats,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message ?? 'Internal server error',
    });
  }
};

// ─── Organizer dashboard ──────────────────────────────────────────────────────

const VALID_ORGANIZER_STATUSES: OrganizerEventStatusFilter[] = ['all', 'published', 'draft', 'ended'];

export const getOrganizerEvents = async (req: Request, res: Response) => {
  try {
    const organizerId = (req as any).user.id;

    const statusParam = req.query.status as string | undefined;
    const status: OrganizerEventStatusFilter = VALID_ORGANIZER_STATUSES.includes(
      statusParam as OrganizerEventStatusFilter
    )
      ? (statusParam as OrganizerEventStatusFilter)
      : 'all';

    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string, 10) || 10));

    const result = await getOrganizerEventsService(organizerId, { status, page, limit });

    res.status(200).json({
      status: 'success',
      ...result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: error.message ?? 'Internal server error',
    });
  }
};