import React, { useState, useEffect } from "react";
import { api } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  // Load tasks
  useEffect(() => {
    async function getTasks() {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    getTasks();
  }, []);

  // Add new task
  async function addTask() {
    if (text.trim() === "") return;
    try {
      await api.post("/tasks", { name: text });
      setText("");
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  // Toggle completed
  async function toggleCompleted(task) {
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  // Delete task
  async function removeTask(id) {
    try {
      await api.delete(`/tasks/${id}`);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  // Filter tasks
  const visibleTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>

      {/* add task */}
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* filter */}
      <div className="flex justify-center gap-2 mb-4">
        {["all", "completed", "pending"].map(f => (
          <button
            key={f}
            className={`px-3 py-1 rounded ${filter === f ? "bg-gray-800 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* task list */}
      <ul>
        {visibleTasks.map(task => (
          <li key={task._id} className="flex justify-between items-center border-b py-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task)}
              />
              <span className={task.completed ? "line-through text-gray-500" : ""}>
                {task.name}
              </span>
            </div>
            
            {/* delete task */}
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeTask(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
