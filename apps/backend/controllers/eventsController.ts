import { UpdateEventDto } from './../../shared/types/eventTypes';
import { EventModel } from "../models/eventsModel";
import { CreateEventDto } from "../../shared/types/eventTypes";
import { Request, Response } from "express";
import mongoose from 'mongoose';
// import { log } from 'console';

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


class APIFeatures {
  query: any;
  queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }
  filter(){
     const queryObj = {...this.queryString };
      const excluded = ['sort', 'limit', 'page', 'fields'];
      excluded.forEach(k => delete queryObj[k]);

      const advancedQ: any = {};
      Object.entries(queryObj).forEach(([key, value]) => {
        if (key === 'price') {
          const num = Number(value);
          if (Number.isNaN(num)) {
            console.log('>>> BAD exact price value:', value);
            return; 
          }
          console.log('>>> exact price cents:', num);
          advancedQ.ticketClasses = { $elemMatch: { price: num } };
        } else if (key.startsWith('price[')) {
          const op = key.match(/\[(.+)\]/)?.[1]; // gte, gt, lte, lt
          const num = Number(value);
          if (Number.isNaN(num)) {
            console.log('>>> BAD range price value:', value);
            return;
          }
          
          if (!advancedQ.ticketClasses) advancedQ.ticketClasses = { $elemMatch: {} };
          if (!advancedQ.ticketClasses.$elemMatch.price) {
            advancedQ.ticketClasses.$elemMatch.price = {};
          }
          advancedQ.ticketClasses.$elemMatch.price[`$${op}`] = num;
        } else {
          /* normal root field */
          advancedQ[key] = value;
        }
      });

      this.query = this.query.find(advancedQ)
      return this;
    }

    sort(){
       if (this.queryString.sort) {
          const sortBy = (this.queryString.sort as string).split(',').join(' ');
          this.query = this.query.sort(sortBy)
        }
        return this
    }
    limitField(){
       if (this.queryString.fields) {
          const fields = (this.queryString.fields as string).split(',').join(' ');
         this.query = this.query.select(fields);
        } else{
         this.query  =this.query.select('-__v -createdAt -updatedAt');
        }
        return this
    }
    paginate(){
      const page = Number(this.queryString.page) || 1;
      const limit = Number(this.queryString.limit) || 5;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this
    }
}

export const getAllEvents = async (req: Request, res: Response) => {

  const Features = new APIFeatures(EventModel.find(), req.query )
     .filter()
     .sort()
     .limitField()
     .paginate()
    
  // const events = await mq;
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