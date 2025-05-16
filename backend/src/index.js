import express from "express";
import authRoutes from "./routes/authRoute.js";
import dotenv from "dotenv";
import { dbConnect } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // Allows us to use json data from the models/ db
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.listen(PORT || 8000, () => {
  dbConnect();
  console.log("Server live on port: ", PORT);
});
