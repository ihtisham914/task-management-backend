import bcrypt from "bcryptjs/dist/bcrypt.js";
import { UserModel } from "../model/userModel.js";



// SIGNUP USER
export const signupUser = async (req, res) => {
    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const user = await UserModel.create({ name, email, password: hashedPassword })
        res.status(201).json({
            status: 201,
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
}

// LOGIN USER
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Invalid credentials",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error.message,
        });
    }
}