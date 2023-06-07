import Joi from "joi";
export const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên dự án không được để trống",
    "any.required": "Trường tên dự án là bắt buộc",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Mô tả không được để trống",
    "any.required": "Trường mô tả là bắt buộc",
  }),
  images: Joi.array().default([]),
  majob: Joi.string().required().messages({
    "string.empty": "Chuyên ngành không được để trống",
    "any.required": "Trường Chuyên ngành là bắt buộc",
  }),
  link_git: Joi.string().required(),
  link_fb: Joi.string().required(),
  address: Joi.string().required(),
  date_of_birth: Joi.date().required(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": "invalid phone",
    }),
  email: Joi.string().email().required(),
  createdAt: Joi.string().default(() => new Date()),
  updatedAt: Joi.string().default(() => new Date()),
});
