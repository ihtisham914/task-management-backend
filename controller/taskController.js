import { TaskModel } from "../model/taskModel.js";

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