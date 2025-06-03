import express from "express";
import { createTask, deleteTask, getTasks, getTaskById, updateTask } from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";  // ✅ Fixed path

const router = express.Router();

// No need to prefix "/tasks" here, as `server.js` already has `app.use("/api/tasks", taskRoutes)`
router.get("/", protect, getTasks);  // GET all tasks
router.get("/:id", protect, getTaskById);  // GET a task by ID
router.post("/", protect, createTask);  // CREATE a task
router.put("/:id", protect, updateTask);  // UPDATE a task
router.delete("/:id", protect, deleteTask);  // DELETE a task

export default router;
