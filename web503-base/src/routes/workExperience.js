import express from "express";
import {
  addExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} from "../controllers/workExperience";
const router = express.Router();
router.get("/experiences", getExperience);
router.post("/experiences", addExperience);
router.put("/experiences/:id", updateExperience);
router.delete("/experiences/:id", deleteExperience);

export default router;
