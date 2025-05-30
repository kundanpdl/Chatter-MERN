import express from "express";
import authRoutes from "./routes/authRoute.js";
import dotenv from "dotenv";
import { dbConnect } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import bodyParser from "body-parser";

dotenv.config();

const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }));

app.use(express.json()); // Allows us to use json data from the req.body
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

server.listen(PORT || 8000, () => {
  dbConnect();
  console.log("Server live on port: ", PORT);
});
