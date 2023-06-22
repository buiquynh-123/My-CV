import express from "express";
import { create, getAll, getOne, remove, update } from "../controllers/order";
const router = express.Router();

router.get("/orders", getAll);
router.get("/orders", getOne);
router.post("/orders", create);
router.put("/orders/:id", update);
router.delete("/orders/:id", remove);
export default router;
