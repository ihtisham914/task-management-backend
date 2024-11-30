import { Router } from "express";
import { loginUser, signupUser } from "../controller/userController.js";

const userRouter = Router();

userRouter.route("/").post(signupUser)
userRouter.route("/login").post(loginUser)

export default userRouter