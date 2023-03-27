import express from "express";
import { add, get, getAll, remove, update } from "../controllers/products";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", add);
router.delete("/products/:id", remove);
router.put("/products/:id", update);

export default router;
