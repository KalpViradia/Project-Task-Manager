import asyncHandler from "express-async-handler";

export const getTasks = asyncHandler(async (req, res) => {
    res.status(200).json(req.user.tasks);
});

export const getTaskById = asyncHandler(async (req, res) => {
    const task = req.user.tasks.id(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
});

export const createTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, priority, status } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newTask = { title, description, dueDate, priority, status };
    req.user.tasks.push(newTask);
    await req.user.save();

    res.status(201).json(newTask);
});

export const updateTask = asyncHandler(async (req, res) => {
    const task = req.user.tasks.id(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    Object.assign(task, req.body);
    await req.user.save();
    res.status(200).json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
    const taskIndex = req.user.tasks.findIndex((task) => task.id === req.params.id);
    if (taskIndex === -1) return res.status(404).json({ message: "Task not found" });

    req.user.tasks.splice(taskIndex, 1);
    await req.user.save();
    res.status(200).json({ message: "Task deleted successfully" });
});
