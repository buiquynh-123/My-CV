import mongoose from "mongoose";
const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: String,
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  image: String,
  category_id: {
    type: Number,
    require: true,
  },
});
const Product = mongoose.model("products", productSchema);
export default Product;
