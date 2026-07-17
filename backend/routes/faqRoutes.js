import express from "express";
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from "../controllers/faqController.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

router.get("/", getFAQs);
router.post("/", verifyAdmin, createFAQ);
router.put("/:id", verifyAdmin, updateFAQ);
router.delete("/:id", verifyAdmin, deleteFAQ);

export default router;
