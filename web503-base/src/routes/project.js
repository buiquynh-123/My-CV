import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projects";
const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "WE17301",
  },
});
const upload = multer({ storage: storage });
router.get("/projects", getProjects);
router.get("/projects/:id", getProjectById);
router.post("/projects", upload.array("images", 10), addProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);
export default router;
