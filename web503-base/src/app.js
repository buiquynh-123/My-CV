import express from "express";
import dotenvn from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import projectRouter from "./routes/project";
import userRouter from "./routes/user";
import categoryRouter from "./routes/category";
import skillRouter from "./routes/skill";
import experienceRouter from "./routes/workExperience";
dotenvn.config();
const app = express();
app.use(cors());
app.use(express.json());

// middleware
app.use(cookieParser());

app.use("/api", projectRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", skillRouter);
app.use("/api", experienceRouter);
mongoose.connect(process.env.MONGO_URI);
export const viteNodeApp = app;
