import express from "express";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "../controllers/testimonialController.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", verifyAdmin, createTestimonial);
router.put("/:id", verifyAdmin, updateTestimonial);
router.delete("/:id", verifyAdmin, deleteTestimonial);

export default router;
