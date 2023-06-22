import express from "express";
import { bodyParser } from "body-parser";
import { signin, authGoogle, authFacebook, signup } from "../controllers/auth";
import passport from "passport";
const router = express.Router();
import "../middlewares/passport";
router.post("/signin", signin);
router.post("/signup", signup);
router.post(
  "/auth/google",
  passport.authenticate("google-plus-token", { session: false }),
  authGoogle
);
router.post(
  "/auth/facebook",
  passport.authenticate("facebook-token", { session: false }),
  authFacebook
);
export default router;
