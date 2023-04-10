import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = mongoose.Schema(
  {
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
    cloudinary_id: String,
    category_id: {
      type: mongoose.Types.ObjectId,
      // muốn kết nối 2 bảng với nhau thì phải dựa vào thằng objectId
      ref: "categories",
      // nhưng cái thằng category này cần phải liên kết
      // với một model nữa đó là model category tức là phải link đến colection
      // categories thì mới lấy đc dữ liệu
    },
  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model("products", productSchema);
export default Product;
