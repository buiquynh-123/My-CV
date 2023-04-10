import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product";
import categoryRouter from "./routes/category";
import menuRouter from "./routes/menu";
import userRouter from "./routes/user";
import authRouter from "./routes/auth.js";
import signupRouter from "./routes/signup";
dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// router
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);
app.use("/api", menuRouter);
app.use("/api", authRouter);
app.use("/api", signupRouter);

mongoose.connect(process.env.MONGO_URI);

export const viteNodeApp = app;
