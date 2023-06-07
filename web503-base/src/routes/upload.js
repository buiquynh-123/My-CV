import express from "express";
import multer from "multer";
import { deleteImage, updateImage, uploadImage } from "../controllers/upload";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import uploadCloud from "../config/cloudinary";
const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: uploadCloud,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "WE17301",
  },
});

const upload = multer({ storage: storage });

router.post("/images/upload", upload.array("images", 10), uploadImage);
router.delete("/images/:publicId", deleteImage);
router.put("/images/:publicId", upload.array("images", 10), updateImage);

export default router;
