import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category";
const router = express.Router();
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.post("/categories", addCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);
export default router;
