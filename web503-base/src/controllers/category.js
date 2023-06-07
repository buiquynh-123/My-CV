import Category from "../medels/category";
import Project from "../medels/project";
import { categorySchema } from "../shemas/category";
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(400).json({
        message: "Khong tim thay danh muc",
      });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "projects"
    );
    if (!category) {
      return res.status(400).json({
        message: "Khong tim thay danh muc",
      });
    }
    return res.json(category);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const addCategory = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const { error } = categorySchema.validate(body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const category = Category.create(body);
    if (!category) {
      return res.status(400).json({
        message: "Them danh muc that bai",
      });
    }
    return res.json({
      message: "Them danh muc thanh cong",
      category,
    });
  } catch (error) {}
};
export const updateCategory = async (req, res) => {
  try {
    const error = categorySchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const project = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(400).json({
        message: "Sua danh muc that bai",
      });
    }
    return res.json({
      message: "Sua danh muc thanh cong",
      project,
    });
  } catch (error) {}
};
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const projectUpdate = await Project.find({ category_id: categoryId });
    projectUpdate.forEach(async (project) => {
      await Project.findByIdAndUpdate(
        { _id: project._id },
        { category_id: "6433af95d60535f5d75f1d95" },
        { new: true }
      );
    });
    await Category.findByIdAndUpdate(
      {
        _id: "6433af95d60535f5d75f1d95",
      },
      { projects: [...projectUpdate] }
    );
    const category = await Category.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xoa danh muc thanh cong",
      category,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
