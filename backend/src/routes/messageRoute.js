import express from "express";
import { routeProtect } from "../middleware/authMiddleware.js";
import {
  usersSidebar,
  getMessages,
  sendMessages,
} from "../controllers/messageController.js";

const router = express.Router();

// To get list of users, for sidebar component
router.get("/users", routeProtect, usersSidebar);

// To get messages using userId and checking authentication
router.get("/:id", routeProtect, getMessages);

router.post("/send/:id", routeProtect, sendMessages);
export default router;
