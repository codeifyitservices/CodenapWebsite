import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  shortTitle: { type: String },
  tagline: { type: String },
  headline: { type: String },
  description: { type: String },
  longDescription: { type: String },
  icon: { type: String }, // e.g. "Code2", "Network"
  accentColor: { type: String }, // e.g. "orange", "blue", "violet"
  image: { type: String },
  techStack: [{ type: String }],
  bulletPoints: [{ type: String }],
  features: [
    {
      title: { type: String },
      desc: { type: String }
    }
  ],
  process: [
    {
      step: { type: String },
      title: { type: String },
      desc: { type: String }
    }
  ],
  stats: [
    {
      value: { type: String },
      label: { type: String }
    }
  ],
  tags: [{ type: String }],
  accent: { type: String },
  accentShadow: { type: String },
  accentBadge: { type: String },
  order: { type: Number, default: 0 },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
    canonicalUrl: { type: String }
  }
});

export default mongoose.model("Service", serviceSchema);
