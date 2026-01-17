import { protect } from './../controllers/authController';
import { Router } from "express";
const router = Router();
import { createEvent, getAllEvents, updateEvent, deleteEvent, getSingleEvent, getMonthlyEventsStats, getTicketDetails } from "../controllers/eventsController";
router.route("/")
    .post(protect, createEvent)
    .get(getAllEvents);
router.route("/stats/monthly-events-stats/:year")
    .get(getMonthlyEventsStats);
router.route("/:id/tickets")
    .get(getTicketDetails);
router.route("/:id")
    .patch(updateEvent)
    .delete(deleteEvent)
    .get(getSingleEvent);
export const eventsRoute = router;
