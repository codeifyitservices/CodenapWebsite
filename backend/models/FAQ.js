import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  bullets: [{ type: String }],
  page: { type: String, required: true, enum: ["home", "careers"] }
});

export default mongoose.model("FAQ", faqSchema);
