import { Router } from "express";
import { createTask, getAllTasks, updateTask } from "../controller/taskController.js";

const taskRouter = Router();

taskRouter.route("/").post(createTask).get(getAllTasks);
taskRouter.route("/:id").patch(updateTask)

export default taskRouter;