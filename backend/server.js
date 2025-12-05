import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/taskRoutes.js";
import { connectDB } from "./db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.Frontend_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api", router);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});


const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
