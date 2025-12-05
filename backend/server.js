import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/taskRoutes.js";
import { connectDB } from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
