import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import heroRoutes from "./routes/heroRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import connectDB from "./config/db.js";
import { seedAdmin } from "./utils/seedAdmin.js";

dotenv.config();

const app = express();
app.use(express.json());
connectDB().then(() => seedAdmin());

app.use(
  cors({
    origin: [
      "https://codenap-test.onrender.com",
      "http://localhost:4001",
      "https://node.codenap.in/api",
      "http://localhost:5173",
      "https://codenap-website.vercel.app",
      "https://codenap.co.in",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Serve uploads statically
app.use("/uploads", express.static("uploads"));

app.use("/api/hero", heroRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/settings", settingRoutes);

const PORT = process.env.PORT || 5000;
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
