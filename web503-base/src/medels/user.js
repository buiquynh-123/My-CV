import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  images: {
    type: Array,
    default: [],
  },

  majob: {
    type: String,
    require: true,
  },
  link_git: {
    type: String,
    require: true,
  },
  link_fb: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  date_of_birth: {
    type: Date,
    require: true,
  },
});

const User = mongoose.model("users", userSchema);
export default User;
