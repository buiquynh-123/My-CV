import mongoose from "mongoose";
const SkillSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  images: {
    type: Array,
    default: [],
  },
});

const Skill = mongoose.model("skills", SkillSchema);
export default Skill;
