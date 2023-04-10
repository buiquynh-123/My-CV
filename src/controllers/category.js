import Joi from "joi";
import Category from "../models/category";
import Product from "../models/product";
import cloudinary from "../utils/cloudinary";
import User from "../models/user";
const categorySchema = Joi.object({
  name: Joi.string().required(),
  avatar: Joi.string(),
  cloudinary_id: Joi.string(),
});
export const getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(400).json({
        message: "Không tìm thấy danh mục",
      });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.status(400).json({
        message: "Không tìm thấy danh mục",
      });
    }
    return res.json(category);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const add = async (req, res) => {
  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    const body = {
      ...req.body,
      // avatar: result.secure_url,
      // cloudinary_id: result.public_id,
    };
    // console.log(body);
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
        message: "Thêm danh mục thất bại",
      });
    }
    return res.json({
      message: "Thêm danh mục thành công",
      data,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    // let category = await Category.findById(req.params.id);
    // console.log("ket qua update");
    // await cloudinary.uploader.destroy(category.cloudinary_id);
    // console.log(req);
    // const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(result);
    const body = {
      name: req.body.name,
    };
    const data = await Category.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    if (!data) {
      return res.status(400).json({
        message: "Sửa danh mục thất bại",
      });
    }
    return res.json({
      message: "Sửa danh mục thành công",
      data,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryItem = await Category.findById(req.params.id);
    // delete image form cloudinary
    // await cloudinary.uploader.destroy(categoryItem.cloudinary_id);
    const productUpdate = await Product.find({ category_id: categoryId });
    console.log("productUpdate:" + productUpdate);
    productUpdate.forEach(async (product) => {
      await Product.findOneAndUpdate(
        { _id: product._id },
        { category_id: "6433af95d60535f5d75f1d95" },
        { new: true }
      );
    });
    await Category.findByIdAndUpdate(
      { _id: "6433af95d60535f5d75f1d95" },
      {
        products: [...productUpdate],
      }
    );
    // await Product.deleteMany({ category_id: categoryId });

    const category = await Category.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa danh mục thành công",
      category,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
