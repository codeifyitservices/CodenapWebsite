import { generateToken } from "../utils/auth.js";

export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "codenap@2026";

    if (username === expectedUsername && password === expectedPassword) {
      const token = generateToken({ username, role: "admin" });
      return res.status(200).json({
        message: "Login successful",
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
};
