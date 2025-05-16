import express from "express";
import { checkAuth } from "../middleware/authMiddleware.js";
import {
  usersSidebar,
  getMessages,
  sendMessages,
} from "../controllers/messageController.js";

const router = express.Router();

// To get list of users, for sidebar component
router.get("/users", checkAuth, usersSidebar);

// To get messages using userId and checking authentication
router.get("/:id", checkAuth, getMessages);

router.post("/:id", checkAuth, sendMessages);
export default router;
