import express from "express";
import {
  submitContactForm,
  submitBookingForm,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/submit", submitContactForm);
router.post("/booking", submitBookingForm);

export default router;
