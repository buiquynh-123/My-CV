import { date, string } from "joi";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    created_at: {
      type: Date,
    },
    avatar: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    roles: {
      type: String,
      default: "member",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("users", userSchema);
export default User;
