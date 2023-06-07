import Project from "../medels/project";
import { projectSchema } from "../shemas/project";
import Category from "../medels/category";
import cloudinary from "../config/cloudinary";
export const getProjects = async (req, res) => {
  try {
    const data = await Project.find();
    if (!data) {
      return res.status(400).json({
        message: "Khong tim thay du an",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate({
      path: "category_id",
    });
    if (!project) {
      return res.status(400).json({
        message: "Khong tim thay du an",
      });
    }
    return res.status(200).json({ project });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const addProject = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path);
    const uploadedImages = [];
    for (const image of images) {
      try {
        const result = await cloudinary.uploader.upload(image);
        uploadedImages.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      } catch (error) {
        console.log(error);
      }
    }
    const body = {
      ...req.body,
      images: uploadedImages,
    };
    console.log(body);
    const { error } = projectSchema.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const project = await Project.create(body);
    console.log(project);
    await Category.findByIdAndUpdate(project.category_id, {
      $addToSet: {
        projects: project._id,
      },
    });
    if (!project) {
      res.status(400).json({
        message: "Them du an that bai",
      });
    }
    return res.json({
      message: "Them du an thanh cong",
      project,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
export const updateProject = async (req, res) => {
  try {
    const { error } = projectSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    let project = await Project.findById(req.params.id);
    let result = null;
    if (req?.file?.path) {
      await cloudinary.uploader.destroy(project?.cloudinary_id);
      result = await cloudinary.uploader.upload(req?.file?.path);
    }
    const data = {
      ...req.body,
      image: result?.secure_url || project.image,
      cloudinary_id: result?.public_id || project.cloudinary_id,
    };
    project = await Project.findByIdAndUpdate(data, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(400).json({
        message: "Sua du an that bai",
      });
    }
    return res.json({
      message: "Sua san pham thanh cong",
      projectUpdate,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const projectItem = await Project.findById(req.params.id);
    await projectItem.images.forEach((item) => {
      cloudinary.uploader.destroy(item.publicId);
    });
    const project = await Project.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xoa san pham thanh cong",
      project,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
