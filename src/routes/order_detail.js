import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../controllers/order_details";
const router = express.Router();
router.get("/order_details", getAll);
router.get("/order_details/:id", getOne);
router.post("/order_details", create);
router.put("/order_details/:id", update);
router.delete("/order_details/:id", remove);
export default router;
