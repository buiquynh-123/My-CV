import User from "../models/user";
import mongoose from "mongoose";
import { signupSchema, signinSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// B1: Validate object từ client gửi lên(name, email, password, confirmPassword)
// B2: Kiểm tra email đã tồn tại chưa(Nếu mà có rồi thì trả về lỗi: Email đã tồn tại)
// B3: Mã hóa mật khẩu
// B4: Tạo user mới
// B5: Tạo token
// B6: Trả về token và user
export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      // ['Trường tên là bắt buộc', 'Email không đúng định dạng']
      return res.status(400).json({
        messages: errors,
      });
    }
    // const userExist = await User.findOne({ email: req.body.email });
    // if (userExist) {
    //   return res.status(400).json({
    //     message: "Email da ton tai",
    //   });
    // }
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // const user = await User.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: hashedPassword,
    // });
    // const accessToken = jwt.sign({ _id: user._id }, "ban", { expiresIn: "1d" });
    // return res.status(201).json({
    //   message: "Dang ky tk thanh cong",
    //   accessToken,
    //   user,
    // });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

// B1: Validate object từ client gửi lên(email, password)
// B2: Kiểm tra email đã tồn tại chưa (Nếu không có thì trả về lỗi: Bạn chưa đăng ký tài khoản)
// B3: So sánh giá trị(password) từ client nó giống với password ở db không?
// B4: Tạo token
// B5: Trả về token và user
export const singnin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Ban chua dang ki tai khoan",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mat kau khong dung",
      });
    }
    const accessToken = jwt.sign({ _id: user.id }, "banthaydat", {
      // jwt là đoạn mã chứa các thông tin đã đc mã hóa rồi
      expiresIn: "1d",
    });
    return res.status(200).json({
      message: "Dang ki thanh cong",
      accessToken,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
