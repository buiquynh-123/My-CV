import express from "express";
import multer from "multer";
import {
  add,
  get,
  getAll,
  remove,
  update,
  search,
} from "../controllers/products";
import { checkPermission } from "../middlewares/checkPermission";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig";
const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "WE17301",
  },
});
const upload = multer({ storage: storage });
router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/search", search);
router.post("/products", checkPermission, upload.array("image", 10), add);
router.delete("/products/:id", checkPermission, remove);
router.put("/products/:id", checkPermission, update);
export default router;
