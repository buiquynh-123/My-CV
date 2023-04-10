import mongoose from "mongoose";
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "products" }],
  },
  { timestamps: true, versionKey: false }
);
const Category = mongoose.model("categories", categorySchema);

export default Category;
