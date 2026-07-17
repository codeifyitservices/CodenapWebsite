import FAQ from "../models/FAQ.js";

export const getFAQs = async (req, res, next) => {
  try {
    const { page } = req.query;
    const filter = {};
    if (page) {
      filter.page = page;
    }
    const faqs = await FAQ.find(filter);
    res.status(200).json(faqs);
  } catch (error) {
    next(error);
  }
};

export const createFAQ = async (req, res, next) => {
  try {
    const { question, answer, bullets, page } = req.body;
    if (!question || !answer || !page) {
      return res.status(400).json({ message: "Question, answer, and page are required." });
    }
    const newFAQ = new FAQ({ question, answer, bullets, page });
    await newFAQ.save();
    res.status(201).json({ message: "FAQ created successfully", faq: newFAQ });
  } catch (error) {
    next(error);
  }
};

export const updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json({ message: "FAQ updated successfully", faq });
  } catch (error) {
    next(error);
  }
};

export const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    next(error);
  }
};
