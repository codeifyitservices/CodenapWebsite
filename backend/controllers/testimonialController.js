import Testimonial from "../models/Testimonial.js";

export const getTestimonials = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const testimonials = await Testimonial.find(filter);
    res.status(200).json(testimonials);
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const { name, role, company, tenure, initials, color, rating, text, image, category } = req.body;
    if (!name || !role || !text || !category) {
      return res.status(400).json({ message: "Name, role, text, and category are required." });
    }
    const newTestimonial = new Testimonial({
      name,
      role,
      company,
      tenure,
      initials,
      color,
      rating,
      text,
      image,
      category,
    });
    await newTestimonial.save();
    res.status(201).json({ message: "Testimonial created successfully", testimonial: newTestimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json({ message: "Testimonial updated successfully", testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    next(error);
  }
};
