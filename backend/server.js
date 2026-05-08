import express from "express";
import cors from "cors";
import taskRouter from "./routes/tasks.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRouter);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
