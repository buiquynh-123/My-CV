import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Types.ObjectId,
    // muốn kết nối 2 bảng với nhau thì phải dựa vào objectId
    ref: "users",
  },

  items: [
    {
      product_id: {
        type: mongoose.Types.ObjectId,
        // muốn kết nối 2 bảng với nhau thì phải dựa vào objectId
        ref: "products",
      },
      quantity: {
        type: Number,
      },
      size: {
        type: String,
      },
      color: {
        type: String,
      },
    },
  ],
});

const Cart = mongoose.model("carts", cartSchema);
export default Cart;
