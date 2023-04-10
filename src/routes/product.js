import express from "express";
import { add, get, getAll, remove, update } from "../controllers/products";
import { checkPermission } from "../middlewares/checkPermission";
import upload from "../utils/multer";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", checkPermission, upload.single("image"), add);
router.delete("/products/:id", checkPermission, remove);
router.put("/products/:id", checkPermission, upload.single("image"), update);
export default router;
