import express from "express";
import { deleteTask } from "../controllers/taskController.js";

const router = express.Router();
router.delete("/tasks/:id", deleteTask);

export default router;
