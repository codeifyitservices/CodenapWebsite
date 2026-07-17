import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true },
    email:        { type: String, required: true },
    mobile:       { type: String, required: true },
    business:     { type: String },
    services:     { type: [String], default: [] },
    otherService: { type: String },
    budget:       { type: String },
    startTime:    { type: String },
    guests:       { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);