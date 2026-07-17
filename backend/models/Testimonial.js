import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String }, // For client testimonials (Home)
  tenure: { type: String }, // For employee testimonials (Careers)
  initials: { type: String },
  color: { type: String },
  rating: { type: Number, default: 5 },
  text: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true, enum: ["home", "careers"] }
});

export default mongoose.model("Testimonial", testimonialSchema);
