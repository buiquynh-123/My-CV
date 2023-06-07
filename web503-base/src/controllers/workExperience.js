import { experienceSchema } from "../shemas/workExperience";
import Experience from "../medels/workExperience";
export const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find();
    if (!experience) {
      return res.status(400).json({
        message: "Khong co kinh nghiem nao",
      });
    }
    return res.json(experience);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const addExperience = async (req, res) => {
  try {
    console.log("body: " + req.body);
    const { error } = experienceSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const experience = await Experience.create(req.body);
    if (!experience) {
      return res.status(400).json({
        message: "Them Experience that bai",
      });
    }
    return res.json({
      message: "Them skill thanh cong",
      experience,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { error } = experienceSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!experience) {
      return res.status(400).json({
        message: "Sua experience that bai",
      });
    }
    return res.json({
      message: "Sua experience thanh cong",
      experience,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const deleteExperience = async (req, res) => {
  try {
    const experience = Experience.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xoa skill thanh cong",
      experience,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
