import { Router } from "express";
const router = Router();
import { 
    createEvent, 
    getAllEvents,
    updateEvent, 
    deleteEvent 
} from "../controllers/eventsController";


// Route to create a new event
router.route("/").post(createEvent).get(getAllEvents);

router.route("/:id").patch(updateEvent).delete(deleteEvent);

export const eventsRoute = router;
