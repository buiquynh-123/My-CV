import Joi from "joi";
export const signupSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc",
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Xác nhận mật khẩu không được để trống",
    "any.required": "Trường xác nhận mật khẩu là bắt buộc",
    "any.only": "Xác nhận mật khẩu không khớp",
  }),
  date_of_birth: Joi.date(),
  created_at: Joi.date(),
  avatar: Joi.string(),
  cloudinary_id: Joi.string(),
  phone_number: Joi.number(),
  role: Joi.string(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc",
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
  }),
});
