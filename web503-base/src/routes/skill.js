import express from "express";
import {
  addSkill,
  deleteSkill,
  getSkill,
  updateSkill,
} from "../controllers/skill";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "WE17301",
  },
});
const upload = multer({ storage: storage });
const router = express.Router();
router.get("/skills", getSkill);
router.post("/skills", upload.array("images", 10), addSkill);
router.put("/skills/:id", updateSkill);
router.delete("/skills/:id", deleteSkill);
export default router;
