import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.zoho.in",
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 465,
  secure: process.env.EMAIL_SECURE !== undefined ? process.env.EMAIL_SECURE === "true" : true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"CodeNap" <${process.env.EMAIL_USER || "info@codenap.co.in"}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
