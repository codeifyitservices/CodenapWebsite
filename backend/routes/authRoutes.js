import express from "express";
import { adminLogin, changePassword } from "../controllers/authController.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.put("/change-password", verifyAdmin, changePassword);

export default router;
