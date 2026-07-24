import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

export const seedAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultUsername = process.env.ADMIN_USERNAME || "admin";
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      const newAdmin = new Admin({
        username: defaultUsername,
        password: hashedPassword,
        email: process.env.EMAIL_USER || "codenapdev@gmail.com",
      });

      await newAdmin.save();
      console.log(`[Seed] Initial Admin account (${defaultUsername}) created in database successfully.`);
    }
  } catch (error) {
    console.error("[Seed] Failed to seed default admin account:", error);
  }
};
