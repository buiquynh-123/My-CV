import express from "express";
import productRouter from "./routes/product";
import categoryRouter from "./routes/category";
import menuRouter from "./routes/menu";
import userRouter from "./routes/user";
// import authRouter from "./routes/auth";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// router
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);
app.use("/api", menuRouter);
// app.use("/api", authRouter);
// app.get("/api", (req, res) => {
//   res.json("kljfdakdlsjf");
// });

mongoose.connect("mongodb://127.0.0.1:27017/we17301");

export const viteNodeApp = app;
