import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderDetailsSchema = mongoose.Schema(
  {
    order_id: {
      type: mongoose.Types.ObjectId,
      ref: "orders",
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
    quantity: Number,
    price: Number,
    images: [{ url: String, publicId: String }],
    description: String,
    product_reviews: String,
  },
  { timestamps: true, versionKey: false }
);
orderDetailsSchema.plugin(mongoosePaginate);
const orderDetail = mongoose.model("order_details", orderDetailsSchema);
export default orderDetail;
