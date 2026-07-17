import express from "express";
import Setting from "../models/Setting.js";
import { verifyAdmin } from "../utils/auth.js";

const router = express.Router();

// Get setting by key
router.get("/:key", async (req, res, next) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    res.status(200).json(setting ? setting.value : null);
  } catch (error) {
    next(error);
  }
});

// Update or create setting by key
router.put("/:key", verifyAdmin, async (req, res, next) => {
  try {
    const setting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { value: req.body.value },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: "Setting updated successfully", setting });
  } catch (error) {
    next(error);
  }
});

export default router;
