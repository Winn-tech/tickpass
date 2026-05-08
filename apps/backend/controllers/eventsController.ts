// import { UpdateEventDto, CreateEventDto } from "../../shared/types/eventTypes";
// import { EventModel } from "../models/eventsModel";
// import { Request, Response } from "express";
// import  APIFeatures  from "../utils/getEventFeatures";
// import mongoose from 'mongoose';

// export const createEvent = async (req: Request, res: Response) => {
//   try {
//     const eventData: CreateEventDto = req.body;
//     const newEvent = await EventModel.create(eventData); 

//     res.status(201).json({
//       status: 'success',
//       data: newEvent,
//     });
//   } catch (err: any) {
//     if (err.code === 11000 || err.code === 11001) {
//       console.log(err);
//       res.status(409).json({ success: false, message: 'Event already exists' });
//       return;
//     }
//     console.error(err);
//     res.status(500).json({ success: false, message: err });
//   }
// };


// export const getAllEvents = async (req: Request, res: Response) => {

//   const Features = new APIFeatures(EventModel.find(), req.query )
//      .filter()
//      .sort()
//      .limitField()
//      .paginate()
//   const events = await Features.query;
//   res.status(200).json({
//     status: 'success',
//     results: events.length,
//     events
//   });
// };

//  export const updateEvent = async (req: Request, res: Response) => {
//     try {
//       const updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//       res.status(200).json({
//         status: 'success',
//         data: updatedEvent,
//       });
//     } catch (error) {
//       res.status(500).json({
//         status: 'error',
//         message: error,
//       });
//     }
//  }


//  export const deleteEvent = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({
//           status: 'error',
//           message: 'Invalid event ID format'
//         });
//       }
      
//       const deletedEvent = await EventModel.findByIdAndDelete(id);
      
//       if (!deletedEvent) {
//         return res.status(404).json({
//           status: 'error',
//           message: 'Event not found'
//         });
//       }
      
//       console.log('Deleted event:', deletedEvent);
//       res.status(204).json({
//         status: 'success',
//         message: 'Event deleted successfully',
//       });
      
//     } catch (error) {
//       console.log('Delete error:', error);
//       res.status(500).json({
//         status: 'error',
//         message: 'Internal server error'
//       });
//     }
// };

// export const getTicketDetails = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Invalid event ID format'
//       });
//     }
//     const event = await EventModel.findById(id)
//       .select('ticketClasses title');
//     if (!event) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'Event not found'
//       });
//     }
//     res.status(200).json({
//       status: 'success',
//       data: {
//         ticketClasses: event.ticketClasses,
//         title: event.title,
//       }
//     });
    
//   } catch (error: any) {
//     console.error('Error fetching ticket details:', error);
    
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Invalid event ID'
//       });
//     }
//     res.status(500).json({
//       status: 'error',
//       message: 'Internal server error',
//       ...(process.env.NODE_ENV === 'development' && { error: error.message })
//     });
//   }
// }


// export const getSingleEvent = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const event = await EventModel.findById(id);
//     if (!event) {
//       return res.status(404).json({
//         status: 'error',
//         message: 'Event not found'
//       });
//     }
//     res.status(200).json({
//       status: 'success',
//       data: event
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       message: 'Internal server error'
//     });
//   }
// };

// export const getMonthlyEventsStats = async (req: Request, res: Response) => {
//    try {
//       const year = parseInt(req.params.year); 
//       const stats = await EventModel.aggregate(
//         [
//             {$match: {
//               startDate: { 
//                 $gte: new Date(`${year}-01-01`), 
//                 $lte: new Date(`${year}-12-31`)}
//             }},
//             {
//              $group: {
//               _id : { month: { $month: "$startDate" } },
//               numEvents: { $sum: 1},
//               createdEvents: { $push: "$title" }
//             }
//            },
//            {
//             $addFields: { month: '$_id.month' }
//            },
//            {
//             $project: { _id: 0 }
//            },
//            {
//             $sort: { month: 1 }
//            }
//         ]
//       )
//       res.status(200).json({
//         status: 'success',
//         data: stats
//       });
//    } catch (error) {
//     console.log(error)
//       res.status(500).json({
//         status: 'error',
//         message: 'Internal server error'
//       });
//    }
// };


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
  enrichEvent,
} from '../services/eventService';

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