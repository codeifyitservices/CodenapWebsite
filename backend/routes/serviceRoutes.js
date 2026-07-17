import express from "express";
import { getServices, getServiceById, createService, updateService, deleteService } from "../controllers/serviceController.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", verifyAdmin, createService);
router.put("/:id", verifyAdmin, updateService);
router.delete("/:id", verifyAdmin, deleteService);

export default router;
