import jwt from "jsonwebtoken";

// UserId (identifier) needed to identify the user accessing their account.
export const generateToken = (userId, res) => {
  // Creating token with payload as userID, secret key from .env file, and setting it to expire in 7 days.
  // Basically creating an envelope with userId sealed using JWT_SECRET.
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Creating a cookie with max age of 7 days.
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MaxAge needs to be in miliseconds.
    httpOnly: true, // To prevent XSS attacks. Make cookie not accessible to javascript.
    sameSite: "strict", // Cookie only sent with same site, no other site can send cookies.
    secure: process.env.NODE_ENV !== "development", // We are using http in development, https in production.
  });

  return token;
};
