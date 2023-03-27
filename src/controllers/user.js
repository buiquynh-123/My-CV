import Joi from "joi";
import User from "../models/user";
const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.number(),
  email: Joi.string(),
  full_name: Joi.string(),
  date_of_birth: Joi.date(),
  created_at: Joi.date(),
  phone_number: Joi.number(),
});

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
      message: error,
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
      message: error,
    });
  }
};
