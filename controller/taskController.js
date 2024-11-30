import mongoose from "mongoose";
import { TaskModel } from "../model/taskModel.js";


// CREATE NEW TASK
export const createTask = async (req, res) => {
    const { title, description, dueDate, status } = req.body
    const newtask = {
        userId: req.user.id,
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
        const tasks = await TaskModel.find({ userId: req.user.id });

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
    const userId = req.user.id;
    try {

        // Find the task by ID
        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });  // If task is not found
        }

        // Check if the userId of the task matches the logged-in user's userId
        const convertedId = new mongoose.Types.ObjectId(userId)
        if (task.userId.equals(convertedId) === false) {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "You are not authorized to update this task"
            });  // If user is not authorized
        }

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

// DELETE TASK
export const deleteTask = async (req, res) => {
    const { id } = req.params
    const userId = req.user.id;
    try {
        // Find the task by ID
        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });  // If task is not found
        }

        // Check if the userId of the task matches the logged-in user's userId
        const convertedId = new mongoose.Types.ObjectId(userId)
        if (task.userId.equals(convertedId) === false) {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "You are not authorized to update this task"
            });  // If user is not authorized
        }

        await TaskModel.findByIdAndDelete(id)
        res.status(200).json({
            status: 'success',
            message: 'Task deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
}