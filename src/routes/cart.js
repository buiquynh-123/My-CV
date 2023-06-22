import express from "express";
import { create, getAll, getOne, remove, update } from "../controllers/carts";
const router = express.Router();
router.get("/carts", getAll);
router.get("/carts/:id", getOne);
router.post("/carts", create);
router.put("/carts/:id", update);
router.delete("/carts/:id", remove);
export default router;
