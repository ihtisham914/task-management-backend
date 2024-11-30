import { Router } from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controller/taskController.js";
import authMiddleware from "../middleware/authMiddleWare.js";

const taskRouter = Router();

taskRouter.route("/").post(authMiddleware, createTask).get(authMiddleware, getAllTasks);
taskRouter.route("/:id").patch(authMiddleware, updateTask).delete(authMiddleware, deleteTask)

export default taskRouter;