import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});
const Category = mongoose.model("categories", categorySchema);

export default Category;
