import { Router } from "express";
const router = Router();
import { 
    createEvent, 
    getAllEvents,
    updateEvent, 
    deleteEvent,
    getSingleEvent, 
    getMonthlyEventsStats
} from "../controllers/eventsController";

router.route("/").post(createEvent).get(getAllEvents);

router.route("/stats/monthly-events-stats/:year")
.get(getMonthlyEventsStats );

router.route("/:id")
.patch(updateEvent)
.delete(deleteEvent)
.get(getSingleEvent);

export const eventsRoute = router;
