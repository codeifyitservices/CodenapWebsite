import express from "express";
import { submitHeroForm } from "../controllers/heroController.js";

const router = express.Router();

router.post("/submit", submitHeroForm);

export default router;
