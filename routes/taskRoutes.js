import { Router } from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controller/taskController.js";

const taskRouter = Router();

taskRouter.route("/").post(createTask).get(getAllTasks);
taskRouter.route("/:id").patch(updateTask).delete(deleteTask)

export default taskRouter;