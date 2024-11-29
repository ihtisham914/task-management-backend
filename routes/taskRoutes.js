import { Router } from "express";
import { createTask } from "../controller/taskController.js";

const taskRouter = Router();

taskRouter.post("/", createTask);

export default taskRouter;