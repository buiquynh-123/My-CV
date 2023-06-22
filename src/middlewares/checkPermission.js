import jwt from "jsonwebtoken";
import User from "../models/user";

export const checkPermission = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        message: "Bạn chưa đăng nhập",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "030902", async (error, payload) => {
      if (error) {
        if (error.name == "TokenExpiredError") {
          return res.status(401).json({
            message: "Token het han",
          });
        }
        if (error.name == "JsonWebTokenError") {
          return res.status(401).json({
            message: "Token khong hop le",
          });
        }
      }
      const user = await User.findById(payload._id);
      console.log("user", user);
      if (user.roles !== "admin") {
        return res.status(401).json({
          message: "Bạn không có quyền truy cập tài nguyên này",
        });
      }
      next();
    });
  } catch (error) {}
};
