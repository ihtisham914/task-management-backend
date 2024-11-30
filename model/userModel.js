import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
});

export const UserModel = model("User", userSchema);