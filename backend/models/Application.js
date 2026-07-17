import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  countryCode: { type: String, default: "+91" },
  noticePeriod: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  experience: { type: String, required: true },
  appliedFor: { type: String, required: true },
  message: { type: String },
  resumeUrl: { type: String, required: true }, // Store path to the uploaded resume
  status: { type: String, enum: ["Pending", "Reviewed", "Shortlisted", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Application", applicationSchema);
