import Joi from "joi";
import Category from "../models/category";
const categorySchema = Joi.object({
  name: Joi.string().required(),
});
export const getAll = async (req, res) => {
  try {
    const data = await Category.find();
    console.log(data);
    if (data.length == 0) {
      return res.status(400).json({
        message: "Khong tim thay danh muc",
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
    const data = await Category.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(400).json({
        message: "Khong tim thay danh muc",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

export const add = async (req, res) => {
  try {
    const body = req.body;
    const { error } = categorySchema.validate(body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Category.create(body);
    if (!data) {
      return res.status(400).json({
        message: "Them khong thanh cong",
      });
    }
    return res.json({
      message: "Them san pham thanh cong",
      data,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Category.findOneAndUpdate({ _id: req.params.id }, body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({
        message: "Sua that bai",
      });
    }
    return res.json({
      message: "Da sua thanh cong",
      data,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Category.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xoa thanh cong",
      product,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};
