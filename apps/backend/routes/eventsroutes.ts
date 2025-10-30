import { Router } from "express";
const router = Router();
import { createEvent } from "../controllers/eventsController";


// Route to create a new event
router.route("/").post(createEvent);

export const eventsRoute = router;
