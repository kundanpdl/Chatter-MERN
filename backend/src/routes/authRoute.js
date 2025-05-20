import express from "express";
import {
  signUp,
  logIn,
  logOut,
  editProfile,
  checkAuth,
} from "../controllers/authController.js";
import { routeProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// For all following routes, the corresponding functions are in authController.js
// Signup route
router.post("/signup", signUp);

// Login route
router.post("/login", logIn);

// Logout route
router.post("/logout", logOut);

// routeProtect is for checking if user is authenticated before giving access to edit the profile.
router.put("/edit-profile", routeProtect, editProfile);

// checkAuth is used to check if user is authenticated after refreshing the application.
router.get("/check", routeProtect, checkAuth);

export default router;
