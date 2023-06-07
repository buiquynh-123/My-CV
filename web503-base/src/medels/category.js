import mongoose from "mongoose";
const categorySchema = mongoose.Schema({
  name: { type: String, require: true },
  projects: [{ type: mongoose.Types.ObjectId, ref: "projects" }],
});
const Category = mongoose.model("categories", categorySchema);
export default Category;
