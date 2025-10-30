// import { EventModel } from "../models/eventsModel";
// import { CreateEventDto } from "../../shared/types/eventTypes";
// import { Request, Response } from "express";


// export const createEvent = async (req:Request, res:Response) => {
//     try {
//         const eventData: CreateEventDto = req.body;
//         const newEvent = await EventModel.create(eventData);
//         res.status(201).json({
//             status: 'success',
//             data : newEvent
//         });
//     } catch (err:any) {
//         if (err.code === 11000 || err.code === 11001) {
//             console.log(err)
//       res.status(409).json({ success: false, message: 'Event already exists' });
//       return;
//     }
//     }

// };
import { EventModel } from "../models/eventsModel";
import { CreateEventDto } from "../../shared/types/eventTypes";
import { Request, Response } from "express";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const eventData: CreateEventDto = req.body;
    const newEvent = await EventModel.create(eventData); // ✅ fixed

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
