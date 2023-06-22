import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product";
import categoryRouter from "./routes/category";
import userRouter from "./routes/user";
import authRouter from "./routes/auth.js";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import orderDetailRouter from "./routes/order_detail";
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
app.use("/api", authRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api", orderDetailRouter);

mongoose.connect(process.env.MONGO_URI);

export const viteNodeApp = app;
