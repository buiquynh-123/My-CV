import express from "express";
import {
  getAllMenu,
  getOneMenu,
  addMenu,
  editMenu,
  removeMenu,
} from "../controllers/menu";
const router = express.Router();
router.get("/menu", getAllMenu);
router.get("/menu/:id", getOneMenu);
router.post("/menu", addMenu);
router.put("/menu/:id", editMenu);
router.delete("/menu/:id", removeMenu);

export default router;
