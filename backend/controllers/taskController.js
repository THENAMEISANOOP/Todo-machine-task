import Task from "../models/Task.js";
import { connectDB } from "../db.js";

// show all tasks
export const getTasks = async (req, res) => {
  await connectDB();
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

//  add new task
export const createTask = async (req, res) => {
  await connectDB();
  const { name } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: "Task name required" });
  const task = await Task.create({ name });
  res.status(201).json(task);
};

// update task
export const updateTask = async (req, res) => {
  await connectDB();
  const { id } = req.params;
  const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updated);
};

// dlete task
export const deleteTask = async (req, res) => {
  await connectDB();
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted" });
};
