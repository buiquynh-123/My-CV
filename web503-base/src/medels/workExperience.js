import mongoose from "mongoose";
const experienceSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const Experience = mongoose.model("experiences", experienceSchema);
export default Experience;
