import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import cookieParser from "cookie-parser";

export const checkAuth = async (req, res) => {
  // Try to check if token exist in cookies.
  const token = req.cookies.jwtToken;
  if (!token) {
    res.status(401).json("Unauthorized");
  }
  console.log("Check authentication");
};
