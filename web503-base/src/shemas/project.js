import Joi from "joi";
export const projectSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên dự án không được để trống",
    "any.required": "Trường tên dự án là bắt buộc",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Mô tả không được để trống",
    "any.required": "Trường mô tả là bắt buộc",
  }),
  images: Joi.array().default([]),

  createdAt: Joi.date().default(() => new Date()),
  end_time: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
  deletedAt: Joi.date().default(null),

  member_number: Joi.string().required().messages({
    "string.empty": "Số thành viên không được để trống",
    "any.required": "Trường số thành viên là bắt buộc",
  }),

  technology: Joi.string().required().messages({
    "string.empty": "Công nghệ sử dụng không được để trống",
    "any.required": "Trường công nghệ sử dụng là bắt buộc",
  }),
  link_git: Joi.string().required(),
  category_id: Joi.string().required(),
});
