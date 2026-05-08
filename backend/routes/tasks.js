import { error } from "console";
import express from "express";
import fs, { read, readSync } from "fs";
import path from "path";
import { title } from "process";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "../data/tasks.json");

const readTasks = () => {
  const tasks = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(tasks);
};

const writeTasks = (tasks) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

const toogleCompleted = (tasks) => {};

router.get("/", (req, res) => {
  const tasks = readTasks();
  res.status(200).json(tasks);
});

router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    res.status(400, { message: "Title is required" });
  }
  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  const tasks = readTasks();
  tasks.push(newTask);

  writeTasks(tasks);
  res.status(201).send({ message: "Task created successfully!" });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const tasks = readTasks();

  const index = tasks.findIndex((task) => task.id == id);
  if (index === -1) {
    return res.status(404).json({ message: "Task Not Found" });
  }
  tasks.splice(index, 1);
  writeTasks(tasks);
  res.status(204).send();
});

// ontoggle
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const tasks = readTasks();
  const task = tasks.find((task) => task.id == id);
  if (!task) {
    res.status(404).json({ message: "Task Not Found!" });
  }
  task.completed = !task.completed;
  writeTasks(tasks);
  res.status(200).json({ message: "Update successfully!", task: task });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const tasks = readTasks();
  const updatedTask = {
    id: uuidv4(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  const task = tasks.find((task) => task.id == id);
  tasks.splice(task, 1, updatedTask);
  writeTasks(tasks);
  res.status(200).json({ message: "Update successfully!", task: updatedTask });
});

export default router;
