import express from "express";
import {
  submitContactForm,
  submitBookingForm,
  getBookings,
  deleteBooking,
  bulkDeleteBookings,
  getContactRequests,
  deleteContactRequest,
  bulkDeleteContactRequests,
} from "../controllers/contactController.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

router.post("/submit", submitContactForm);
router.post("/booking", submitBookingForm);
router.get("/bookings", verifyAdmin, getBookings);
router.post("/bookings/bulk-delete", verifyAdmin, bulkDeleteBookings);
router.delete("/bookings/:id", verifyAdmin, deleteBooking);
router.get("/requests", verifyAdmin, getContactRequests);
router.post("/requests/bulk-delete", verifyAdmin, bulkDeleteContactRequests);
router.delete("/requests/:id", verifyAdmin, deleteContactRequest);

export default router;
