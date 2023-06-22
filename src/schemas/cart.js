import Joi from "joi";
const cartSchema = Joi.object({
  customer_id: Joi.string().required().message({
    "string.empty": "Mã khách hàng không được để trống",
    "any.required": "Trường mã khách hàng là bắt buộc",
  }),
  product_id: Joi.string().required().message({
    "string.empty": "Mã sản phẩm không được để trống",
    "any.required": "Trường mã sản phẩm là bắt buộc",
  }),
  quantity: Joi.number(),
});
export default cartSchema;
