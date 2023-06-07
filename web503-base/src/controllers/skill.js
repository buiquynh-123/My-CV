import Skill from "../medels/skill";
import { skillSchema } from "../shemas/skill";
import cloudinary from "../config/cloudinary";
export const getSkill = async (req, res) => {
  try {
    const skill = await Skill.find();
    if (!skill) {
      return res.status(400).json({
        message: "Khong co ky nang nao",
      });
    }
    return res.json(skill);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const addSkill = async (req, res) => {
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

    const { error } = skillSchema.validate(body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const skill = await Skill.create(body);
    if (!skill) {
      return res.status(400).json({
        message: "Them skill that bai",
      });
    }
    return res.json({
      message: "Them skill thanh cong",
      skill,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { error } = skillSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!skill) {
      return res.status(400).json({
        message: "Sua skill that bai",
      });
    }
    return res.json({
      message: "Sua skill thanh cong",
      skill,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const deleteSkill = async (req, res) => {
  try {
    const skill = Skill.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xoa skill thanh cong",
      skill,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
