import Contact from "../models/Contact.js";
import Booking from "../models/Booking.js";
import { sendEmail } from "../config/nodemailer.js";

export const submitContactForm = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, message } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = new Contact({ firstName, lastName, phoneNumber, email, message });
    await contact.save();

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;
    await sendEmail(process.env.EMAIL_USER || "codenapdev@gmail.com", "New Contact Form Submission", html);

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    next(error);
  }
};

export const submitBookingForm = async (req, res, next) => {
  try {
    const { name, email, mobile, business, services, otherService, budget, startTime, guests } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ message: "Name, email, and mobile are required" });
    }

    const booking = new Booking({ name, email, mobile, business, services, otherService, budget, startTime, guests });
    await booking.save();

    const allServices = [...(services || []), otherService].filter(Boolean).join(", ");

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 8px;">
        <h2 style="color: #1a2332; margin-bottom: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">
          New Booking Request
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; width: 150px; vertical-align: top;"><strong>Name</strong></td>
            <td style="padding: 10px 0; color: #1a2332;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;"><strong>Email</strong></td>
            <td style="padding: 10px 0; color: #1a2332;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;"><strong>Mobile</strong></td>
            <td style="padding: 10px 0; color: #1a2332;">+91 ${mobile}</td>
          </tr>
          ${guests?.length ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;"><strong>Guests</strong></td>
            <td style="padding: 10px 0; color: #1a2332;">${guests.join("<br/>")}</td>
          </tr>` : ""}
          ${business ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;"><strong>About Business</strong></td>
            <td style="padding: 10px 0; color: #1a2332;">${business}</td>
          </tr>` : ""}
          ${allServices ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;"><strong>Services</strong></td>
            <td style="padding: 10px 0; color: #1a2332;">${allServices}</td>
          </tr>` : ""}
          ${budget ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;"><strong>Budget</strong></td>
            <td style="padding: 10px 0; color: #1a2332;">${budget}</td>
          </tr>` : ""}
          ${startTime ? `
          <tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;"><strong>Start Time</strong></td>
            <td style="padding: 10px 0; color: #1a2332;">${startTime}</td>
          </tr>` : ""}
        </table>
      </div>
    `;

    await sendEmail(
      process.env.EMAIL_USER || "codenapdev@gmail.com",
      `New Booking Request from ${name}`,
      html
    );

    res.status(201).json({ message: "Booking submitted successfully" });
  } catch (error) {
    next(error);
  }
};