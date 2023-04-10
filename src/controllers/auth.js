import User from "../models/user";
import { signinSchema, signupSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        messsages: errors.message,
      });
    }
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign({ _id: user._id }, "030902", {
      expiresIn: "1d",
    });

    return res.status(201).json({
      message: "Đăng ký tk thành công",
      accessToken,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// B1: Validate object từ client gửi lên(name, email, password, confirmPassword)
// B2: Kiểm tra email đã tồn tại chưa(Nếu mà có rồi thì trả về lỗi: Email đã tồn tại)
// B3: Mã hóa mật khẩu
// B4: Tạo user mới
// B5: Tạo token
// B6: Trả về token và user
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        messages: errors.message,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Bạn chưa đăng ký tài khoản",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng",
      });
    }

    const accessToken = jwt.sign({ _id: user._id }, "030902", {
      expiresIn: "1d",
    });

    //
    const { password: any, ...others } = user._doc;
    // để bảo mật thì lấy hết các thông tin trừ password

    return res.status(201).json({
      message: "Đăng nhập thành công",
      ...others,
      accessToken,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
// B1: Validate object từ client gửi lên(email, password)
// B2: Kiểm tra email đã tồn tại chưa (Nếu không có thì trả về lỗi: Bạn chưa đăng ký tài khoản)
// B3: So sánh giá trị(password) từ client nó giống với password ở db không?
// B4: Tạo token
// B5: Trả về token và user

// Nhìn
// Hiểu
// ---- Giải thích từng bước 1
// Nhớ
// Code lại
// Repeat
export const getAll = async (req, res) => {
  try {
    const data = await User.find();
    console.log(data);
    if (data.length == 0) {
      return res.status(400).json({
        message: "Khong tim thay nguoi dung",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(400).json({
        message: "Khong tim thay nguoi dung",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    let result = null;
    if (req?.file?.path) {
      await cloudinary.uploader.destroy(product?.cloudinary_id);
      result = await cloudinary.uploader.upload(req?.file?.path);
    }
    const data = {
      ...req.body,
      image: result?.secure_url || product.image,
      cloudinary_id: result?.public_id || product.cloudinary_id,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!user) {
      return res.status(400).json({
        message: "Sửa sản phẩm thất bại",
      });
    }
    return res.json({
      message: "Sửa sản phẩm thành công",
      user,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
