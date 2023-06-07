import User from "../medels/user";
import cloudinary from "../config/cloudinary";
import { userSchema } from "../shemas/user";
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        message: "Khong tim thay user",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const addUser = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path);
    console.log(images);
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
    console.log(uploadedImages);
    const body = {
      ...req.body,
      images: uploadedImages,
    };
    console.log(body);
    const { error } = userSchema.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await User.create(body);

    if (!user) {
      res.status(400).json({
        message: "Them user that bai",
      });
    }
    return res.json({
      message: "Them user thanh cong",
      user,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return req.status(400).json({
        message: errors,
      });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(400).json({
        message: "Sua thong tin nguoi dung that bai",
      });
    }
    return res.json({
      message: "Sua thong tin nguoi dung thanh cong",
      user,
    });
  } catch (error) {}
};
