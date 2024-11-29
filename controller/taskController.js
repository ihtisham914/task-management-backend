import { TaskModel } from "../model/taskModel.js";

// CREATE NEW TASK
export const createTask = async (req, res) => {
    const { title, description, dueDate, status } = req.body
    const newtask = {
        title,
        description,
        dueDate,
        status
    }
    try {
        const task = await TaskModel.create(newtask);
        res.status(201).json({
            status: 201,
            success: true,
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
};

// GET ALL TASKS
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find()

        res.status(200).json({
            status: 200,
            success: true,
            data: tasks
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
}

// UPDATE TASK
export const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }


        res.status(204).json({
            status: 204,
            success: true,
            message: "Task udpated successfully"
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
}