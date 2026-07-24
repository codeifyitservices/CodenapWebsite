import Hero from "../models/Hero.js";
import { sendEmail } from "../config/nodemailer.js";

export const submitHeroForm = async (req, res, next) => {
  try {
    const { name, mobile, message } = req.body;

    if (!name || !mobile || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hero = new Hero({ name, mobile, message });
    await hero.save();

    const html = `
      <h2>New Hero Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;
    sendEmail(
      process.env.EMAIL_USER || "codenapdev@gmail.com",
      "New Hero Form Submission",
      html
    ).catch((emailErr) => {
      console.error("Failed to send hero notification email:", emailErr);
    });

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    next(error);
  }
};
