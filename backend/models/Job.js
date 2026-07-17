import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // e.g. senior-frontend
  title: { type: String, required: true },
  department: { type: String, required: true },
  type: { type: String, required: true },
  locationType: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
  salary: { type: String, required: true },
  badge: { type: String },
  badgeColor: { type: String },
  techStack: [{ type: String }],
  description: { type: String, required: true },
  responsibilities: [{ type: String }],
  requirements: [{ type: String }]
});

export default mongoose.model("Job", jobSchema);
