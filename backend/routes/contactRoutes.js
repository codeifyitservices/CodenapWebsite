import express from "express";
import {
  submitContactForm,
  submitBookingForm,
  getBookings,
  deleteBooking,
  getContactRequests,
  deleteContactRequest,
} from "../controllers/contactController.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

router.post("/submit", submitContactForm);
router.post("/booking", submitBookingForm);
router.get("/bookings", verifyAdmin, getBookings);
router.delete("/bookings/:id", verifyAdmin, deleteBooking);
router.get("/requests", verifyAdmin, getContactRequests);
router.delete("/requests/:id", verifyAdmin, deleteContactRequest);

export default router;
