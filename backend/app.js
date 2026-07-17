import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import heroRoutes from "./routes/heroRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.use(
  cors({
    origin: [
      "https://codenap-test.onrender.com",
      "http://localhost:4001",
      "https://node.codenap.in/api",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);

app.use("/api/hero", heroRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
