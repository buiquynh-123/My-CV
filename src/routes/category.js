import express from "express";
import { getAll, get, add, update, remove } from "../controllers/category";
const router = express.Router();
router.get("/categories", getAll);
router.get("/categories/:id", get);
router.post("/categories", add);
router.put("categories/:id", update);
router.delete("categories/:id", remove);
export default router;
