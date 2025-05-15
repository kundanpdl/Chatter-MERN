import express from "express";
import authRoutes from "./routes/authRoute.js";

const app = express();

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log("Server live in port 8000");
});
