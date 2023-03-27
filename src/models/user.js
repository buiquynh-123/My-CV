import { date, string } from "joi";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
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
  phone_number: {
    type: Number,
  },
});
const User = mongoose.model("users", userSchema);
export default User;
