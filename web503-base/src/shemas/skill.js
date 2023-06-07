import Joi from "joi";
export const skillSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên dự án không được để trống",
    "any.required": "Trường tên dự án là bắt buộc",
  }),
  images: Joi.array().default([]),
});
