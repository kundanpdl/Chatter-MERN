import express from "express";
import authRoutes from "./routes/authRoute.js";
import dotenv from "dotenv";
import { dbConnect } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

console.log(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);

app.listen(PORT || 8000, () => {
  dbConnect();
  console.log("Server live on port: ", PORT);
});
