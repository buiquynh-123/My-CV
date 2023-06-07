import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import { addUser, getUser, updateUser } from "../controllers/user";
const router = express.Router();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "WE17301",
  },
});
const upload = multer({ storage: storage });
router.get("/users/:id", getUser);
router.post("/users", upload.array("images", 10), addUser);
router.put("/users/:id", updateUser);
export default router;
