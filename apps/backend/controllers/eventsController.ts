import { EventModel } from "../models/eventsModel";
import { CreateEventDto } from "../../shared/types/eventTypes";
import { Request, Response } from "express";

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
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  /* 1.  copy and strip control keys */
  const queryObj = { ...req.query };
  const excluded = ['sort', 'limit', 'page', 'fields'];
  excluded.forEach(k => delete queryObj[k]);

  /* 2.  build mongo filter */
  const advancedQ: any = {};
  Object.entries(queryObj).forEach(([key, value]) => {
    if (key === 'price') {
      // exact price
      advancedQ.ticketClasses = { $elemMatch: { priceCents: Number(value) } };
    } else if (key.startsWith('price[')) {
      // range operator  price[gte]=2000
      const op = key.match(/\[(.+)\]/)?.[1]; // gte, gt, lte, lt
      if (op) {
        if (!advancedQ.ticketClasses) advancedQ.ticketClasses = { $elemMatch: {} };
        if (!advancedQ.ticketClasses.$elemMatch.priceCents) {
          advancedQ.ticketClasses.$elemMatch.priceCents = {};
        }
        advancedQ.ticketClasses.$elemMatch.priceCents[`$${op}`] = Number(value);
      }
    } else {
      // normal root-level field
      advancedQ[key] = value;
    }
  });

  /* 3.  mongoose query */
  let mq = EventModel.find(advancedQ);

  /* 4.  sorting */
  if (req.query.sort) {
    const sortBy = (req.query.sort as string).split(',').join(' ');
    mq = mq.sort(sortBy);
  }

  /* 5.  field limiting */
  if (req.query.fields) {
    const fields = (req.query.fields as string).split(',').join(' ');
    mq = mq.select(fields);
  }

  /* 6.  pagination */
  const page = Number(req.query.page) || 1;
  const limit  = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  mq = mq.skip(skip).limit(limit);

  /* 7.  execute */
  const events = await mq;

  res.status(200).json({
    status: 'success',
    results: events.length,
    events
  });
};