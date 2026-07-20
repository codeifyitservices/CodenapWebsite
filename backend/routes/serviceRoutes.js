import express from "express";
import { getServices, getServiceById, createService, updateService, deleteService, updateServicesOrder } from "../controllers/serviceController.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", verifyAdmin, createService);
router.put("/reorder", verifyAdmin, updateServicesOrder);
router.put("/:id", verifyAdmin, updateService);
router.delete("/:id", verifyAdmin, deleteService);

export default router;
