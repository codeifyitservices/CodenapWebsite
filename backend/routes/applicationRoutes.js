import express from "express";
import { 
  submitApplication, 
  getApplications, 
  updateApplicationStatus, 
  deleteApplication, 
  bulkDeleteApplications 
} from "../controllers/applicationController.js";
import { uploadResume } from "../middleware/uploadMiddleware.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

// Public submission path
router.post("/submit", uploadResume.single("resume"), submitApplication);

// Admin-only management paths
router.get("/", verifyAdmin, getApplications);
router.post("/bulk-delete", verifyAdmin, bulkDeleteApplications);
router.put("/:id/status", verifyAdmin, updateApplicationStatus);
router.delete("/:id", verifyAdmin, deleteApplication);

export default router;
