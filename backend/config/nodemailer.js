import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "codenapdev@gmail.com",
    pass: process.env.EMAIL_PASS || "zhdh hjka qnrv ycxn",
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Training Platform" <${
        process.env.EMAIL_USER || "codenapdev@gmail.com"
      }>`,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
