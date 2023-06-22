import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const orderSchema = mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Types.ObjectId,
      // muốn kết nối 2 bảng với nhau thì phải dựa vào objectId
      ref: "users",
    },
    order_items: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order_details",
      },
    ],
    order_date: {
      type: Date,
      required: true,
    },
    order_total: {
      type: Number,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
    },
    order_status: {
      type: String,
      required: true,
    },
    shipping_address: {
      type: String,
      required: true,
    },
    billing_address: {
      type: String,
      required: true,
    },
    shipping_method: {
      type: String,
      required: true,
    },
    shipping_fee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
orderSchema.plugin(mongoosePaginate);
const Order = mongoose.model("orders", orderSchema);
export default Order;
// order_id: mã đơn hàng, đây là trường duy nhất để xác định mỗi đơn hàng riêng biệt.
// customer_id: mã khách hàng, đây là trường dùng để liên kết với bảng khách hàng để lấy thông tin về khách hàng.
// order_date: ngày đặt hàng.
// order_total: tổng giá trị của đơn hàng.
// payment_method: phương thức thanh toán của đơn hàng, ví dụ như tiền mặt, thẻ tín dụng, chuyển khoản ngân hàng,...
// order_status: trạng thái của đơn hàng, ví dụ như đã thanh toán, đang vận chuyển, đã hoàn thành,...
// shipping_address: địa chỉ nhận hàng của khách hàng.
// billing_address: địa chỉ thanh toán của khách hàng.
// shipping_method: phương thức vận chuyển của đơn hàng, ví dụ như giao hàng tận nơi, lấy hàng tại cửa hàng,...
// shipping_fee: phí vận chuyển của đơn hàng.
