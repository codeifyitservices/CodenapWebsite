import Application from "../models/Application.js";
import { sendEmail } from "../config/nodemailer.js";

export const submitApplication = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const {
      name,
      email,
      phone,
      countryCode,
      noticePeriod,
      state,
      city,
      experience,
      appliedFor,
      message
    } = req.body;

    if (!name || !email || !phone || !noticePeriod || !state || !city || !experience || !appliedFor) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Relative path which will be served statically by Express
    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    const application = new Application({
      name,
      email,
      phone,
      countryCode,
      noticePeriod,
      state,
      city,
      experience,
      appliedFor,
      message,
      resumeUrl
    });

    await application.save();

    // Construct URL for candidate CV attachment link
    const serverUrl = req.protocol + "://" + req.get("host");


    // 1. Admin/HR Notification Email Template
    const adminMailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #f97316; margin-bottom: 20px; border-bottom: 2px solid #f97316; padding-bottom: 10px; text-transform: uppercase; font-size: 20px;">New Job Application Received</h2>
        <p>A new application has been submitted through the CodeNap Careers portal. Below are the candidate's details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px;">Candidate Name:</td>
            <td style="padding: 8px 0; color: #0f172a;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td>
            <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone Number:</td>
            <td style="padding: 8px 0; color: #0f172a;">${countryCode} ${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Applied For:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${appliedFor}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Location:</td>
            <td style="padding: 8px 0; color: #0f172a;">${city}, ${state}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Notice Period:</td>
            <td style="padding: 8px 0; color: #0f172a;">${noticePeriod}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Experience:</td>
            <td style="padding: 8px 0; color: #0f172a;">${experience}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569; vertical-align: top;">Cover Message:</td>
            <td style="padding: 8px 0; color: #334155; line-height: 1.5; font-style: italic;">${message || "N/A"}</td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; text-align: center;">
          <a href="${serverUrl}${resumeUrl}" target="_blank" style="background-color: #f97316; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Download / View Candidate CV</a>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        <p style="font-size: 11px; color: #94a3b8; text-align: center;">This is an automated notification from the CodeNap Careers Platform.</p>
      </div>
    `;

    // Send email notification to admin asynchronously
    sendEmail(
      process.env.EMAIL_USER || "codenapdev@gmail.com",
      `[New Job Application] - ${name} has applied for ${appliedFor}`,
      adminMailHtml
    ).catch((err) => {
      console.error("Nodemailer async sending error:", err);
    });

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application status updated successfully", application });
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const bulkDeleteApplications = async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid application IDs" });
    }
    await Application.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Applications deleted successfully" });
  } catch (error) {
    next(error);
  }
};
