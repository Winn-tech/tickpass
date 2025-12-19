import { UpdateEventDto } from './../../shared/types/eventTypes';
import { EventModel } from "../models/eventsModel";
import { CreateEventDto } from "../../shared/types/eventTypes";
import { Request, Response } from "express";
import  APIFeatures  from "../utils/getEventFeatures";
import mongoose from 'mongoose';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const eventData: CreateEventDto = req.body;
    const newEvent = await EventModel.create(eventData); 

    res.status(201).json({
      status: 'success',
      data: newEvent,
    });
  } catch (err: any) {
    if (err.code === 11000 || err.code === 11001) {
      console.log(err);
      res.status(409).json({ success: false, message: 'Event already exists' });
      return;
    }
    console.error(err);
    res.status(500).json({ success: false, message: err });
  }
};


export const getAllEvents = async (req: Request, res: Response) => {

  const Features = new APIFeatures(EventModel.find(), req.query )
     .filter()
     .sort()
     .limitField()
     .paginate()
  const events = await Features.query;
  res.status(200).json({
    status: 'success',
    results: events.length,
    events
  });
};

 export const updateEvent = async (req: Request, res: Response) => {
    try {
      const updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      res.status(200).json({
        status: 'success',
        data: updatedEvent,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
 }


 export const deleteEvent = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid event ID format'
        });
      }
      
      const deletedEvent = await EventModel.findByIdAndDelete(id);
      
      if (!deletedEvent) {
        return res.status(404).json({
          status: 'error',
          message: 'Event not found'
        });
      }
      
      console.log('Deleted event:', deletedEvent);
      res.status(204).json({
        status: 'success',
        message: 'Event deleted successfully',
      });
      
    } catch (error) {
      console.log('Delete error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
};

export const getSingleEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: event
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

export const getMonthlyEventsStats = async (req: Request, res: Response) => {
   try {
      const year = parseInt(req.params.year); 
      const stats = await EventModel.aggregate(
        [
            {$match: {
              startDate: { 
                $gte: new Date(`${year}-01-01`), 
                $lte: new Date(`${year}-12-31`)}
            }},
            {
             $group: {
              _id : { month: { $month: "$startDate" } },
              numEvents: { $sum: 1},
              createdEvents: { $push: "$title" }
            }
           },
           {
            $addFields: { month: '$_id.month' }
           },
           {
            $project: { _id: 0 }
           },
           {
            $sort: { month: 1 }
           }
        ]
      )
      res.status(200).json({
        status: 'success',
        data: stats
      });
   } catch (error) {
    console.log(error)
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
   }
};

// export const trendingEvents = async (req:Request, res:Response) =>{
//   try {
//     const trendingEvent = EventModel.aggregate([
//       {$match:}
//     ])
//   } catch (error) {
    
//   }
// }