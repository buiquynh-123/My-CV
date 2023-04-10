import Joi from "joi";
import Menu from "../models/menu";
const menuSchema = Joi.object({
  name: Joi.string().required(),
  path: Joi.string().required(),
  icon: Joi.string().required(),
  position: Joi.number().required(),
  role: Joi.array().required(),
});
export const getAllMenu = async (req, res) => {
  try {
    const data = await Menu.find();
    if (data.length == 0) {
      return res.status(400).json({
        message: "Khong tim thay menu",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const getOneMenu = async (req, res) => {
  try {
    const data = await Menu.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(400).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const addMenu = async (req, res) => {
  try {
    const body = req.body;
    const { error } = menuSchema.validate(body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors.message,
      });
    }
    const data = await Menu.create(body);
    if (!data) {
      return res.status(400).json({
        message: "Them menu that bai",
      });
    }
    return res.json({
      message: "Them menu thanh cong",
      data,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const editMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Menu.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({
        message: "Sua that bai",
      });
    }
    return res.json({
      message: "Sua thanh cong",
      data,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const removeMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndRemove(req.params.id);
    return res.json({
      message: "Xoa thanh cong",
      menu,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
