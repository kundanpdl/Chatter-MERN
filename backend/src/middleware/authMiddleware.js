import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const routeProtect = async (req, res, next) => {
  try {
    // Try to check if token exist in cookies.
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json("Unauthorized");
    }
    // Decoding the token using the JWT secret we have in our env file.
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // If no decoded token, then return error.
    if (!decodedToken) {
      res.status(400).json("Unauthorized: Invalid Token");
    }
    // Get everything from user table except the users password.
    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      res.status(404).json("User not found");
    }

    // Adding user to request
    req.user = user;
    // Calling the next function if everything works, which is editProfile in this case
    next();
  } catch (error) {
    console.log("Error in checkAuth middleware", error);
    res.status(500).json("Internal Server Error");
  }
};
