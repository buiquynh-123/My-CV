import Joi from "joi";
export const experienceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
