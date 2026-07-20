import { generateToken } from "../utils/auth.js";

export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;

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
