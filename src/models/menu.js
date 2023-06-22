import { array } from "joi";
import mongoose from "mongoose";
const menuSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  path: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
    require: true,
  },
  position: {
    type: Number,
    require: true,
  },
  roles: {
    type: [String],
    required: true,
  },
});
const Menu = mongoose.model("menus", menuSchema);
export default Menu;
