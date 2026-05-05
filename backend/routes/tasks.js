import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "../data/tasks.json");

const readTasks = () => {
  fs.readFile(DATA_FILE, (error, data) => {
    if (error) {
      console.error(error);
    }
    console.log(data);
    return data;
  });
};

const tasks = readTasks();

router.get("/tasks", (req, res) => {
  res.status(200).json({ data: tasks });
});

export default router;
