import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { generateToken } from "../utils/auth.js";

export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Look up admin in database
    const admin = await Admin.findOne({ username });

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        const token = generateToken({ id: admin._id, username: admin.username, role: "admin" });
        return res.status(200).json({
          message: "Login successful",
          token,
        });
      }
    }

    // Fallback check against process.env
    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";
    if (username === expectedUsername && password === expectedPassword) {
      const token = generateToken({ username, role: "admin" });
      return res.status(200).json({
        message: "Login successful",
        token,
      });
    }

    return res.status(401).json({ message: "Invalid username or password" });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }

    // Find admin by ID (from token) or username or default
    let admin = null;
    if (req.admin && req.admin.id) {
      admin = await Admin.findById(req.admin.id);
    }
    if (!admin && req.admin && req.admin.username) {
      admin = await Admin.findOne({ username: req.admin.username });
    }
    if (!admin) {
      admin = await Admin.findOne();
    }

    if (!admin) {
      return res.status(404).json({ message: "Admin account not found in database" });
    }

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    // Hash new password and save
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
