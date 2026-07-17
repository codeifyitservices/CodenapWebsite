import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  mobile: { type: String, required: true, match: /^[0-9]{10}$/ },
  message: { type: String, required: true, minlength: 10 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Hero", heroSchema);
