import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
