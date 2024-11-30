import express from "express";
import cors from "cors";
import helmet from "helmet";
import taskRouter from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to task management api");
});

// ----- Routes ------
app.use("/api/v1/tasks", taskRouter)
app.use("/api/v1/user", userRouter)



// ----- Errors handler ------
app.all("*", (req, res) => {
  res.status(500).json({
    status: 500,
    success: false,
    message: `Can not find ${req.originalUrl} on this server`,
  });
});

export default app;
