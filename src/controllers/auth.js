import User from "../models/user";
import { signinSchema, signupSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import encodedToken =('../utils/token').encodedToken;
// import { admin } from "firebase-admin";

// const serviceAccount = require("/path/to/serviceAccountKey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
export const authFacebook = async (req, res, next) => {
  const token = jwt.sign({ _id: req.user._id }, "my_secret_key");
  res.setHeader("Authorization", token);
  return res.status(200).json({ message: "Đăng nhập thành công" });
};
export const authGoogle = async (req, res, next) => {
  const token = jwt.sign({ _id: req.user._id }, "my_secret_key");
  res.setHeader("Authorization", token);
  return res.status(200).json({ message: "Đăng nhập thành công" });
};

export const signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        messages: errors.message,
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

// ============= Đăng nhập Google
// export const signInWithGoogle = async (req, res) => {
//   try {
//     const token = req.body.token;
//     console.log(token);
//     const credential = admin.auth.GoogleAuthProvider.credential(token);
//     const userCredential = admin.auth().signInWithCredential(credential);
//     // Lấy token xác thực (ID token)
//     const accessToken = userCredential.user.getIdToken();
//     console.log(accessToken);
//     // Trả về token cho người dùng
//     return res.json({
//       message: "Đăng nhập thành công",
//       token: accessToken,
//     });
//   } catch (error) {
//     res.status(401).json({ message: "Đăng nhập thất bại" });
//   }
// };
