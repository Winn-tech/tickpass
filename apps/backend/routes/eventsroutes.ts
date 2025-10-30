import { Router } from "express";
const router = Router();
import { createEvent, getallEvents } from "../controllers/eventsController";


// Route to create a new event
router.route("/").post(createEvent).get(getallEvents);

export const eventsRoute = router;
