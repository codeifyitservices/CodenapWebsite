import express from "express";
import { getJobs, getJobById, createJob, updateJob, deleteJob } from "../controllers/jobController.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", verifyAdmin, createJob);
router.put("/:id", verifyAdmin, updateJob);
router.delete("/:id", verifyAdmin, deleteJob);

export default router;
