import { isObjectIdOrHexString } from "mongoose";
import Order from "../models/order";
import Joi from "joi";
import orderDetail from "../models/order_details";
const orderSchema = Joi.object({
  customer_id: Joi.required(),
  order_date: Joi.date().required(),
  order_total: Joi.number().required(),
  payment_method: Joi.string()
    .valid("cash", "credit_card", "bank_transfer")
    .required(),
  order_status: Joi.string()
    .valid("pending", "confirmed", "shipped", "delivered", "cancelled")
    .required(),
  shipping_address: Joi.string().required(),
  billing_address: Joi.string().required(),
  shipping_method: Joi.string().valid("delivery", "pickup").required(),
  shipping_fee: Joi.number().min(0).required(),
});
export const getAll = async (req, res) => {
  const {
    _sort = "createAt",
    _order = "asc",
    _limit = "10",
    _page = 1,
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    order: {
      [_sort]: _order == "desc" ? -1 : 1,
    },
  };
  try {
    const { docs, totalDocs, totalPages } = await Order.paginate({}, options);
    if (docs.length == 0) {
      return res.status(400).json({
        message: "Khong tim thay don hang",
      });
    }
    return res.status(200).json({
      data: docs,
      totalDocs,
      totalPages,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const data = await Order.findOne({ _id: req.params.id }).populate({
      path: "customer_id",
      path: "product_id",
    });
    if (!data) {
      return res.status(400).json({
        message: "Khong tim thay don hang",
      });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { order_items } = req.body;
    const createOrderItems = await orderDetail.create(order_items);
    console.log("createOrderItems: " + createOrderItems);
    const totalAmount = createOrderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    console.log("totalAmount: " + totalAmount);
    // const { error } = orderSchema.validate(req.body);
    // if (error) {
    //   const errors = error.details.map((detail) => detail.message);
    //   return res.status(400).json({
    //     message: errors,
    //   });
    // }

    const createOrder = await Order.create({
      ...req.body,
      order_items: createOrderItems.map((item) => item._id),
      order_total: totalAmount,
      shipping_method: "delivery",
      order_status: "pending",
    });
    createOrderItems.forEach(async (item) => {
      await item.findByIdAndUpdate(item._id, { order_id: createOrder._id });
    });
    if (!createOrder) {
      return res.status(400).json({
        message: "Tao don hang that bai",
      });
    }

    return res.json({
      message: "Tao don hang thanh cong",
      createOrder,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(400).json({
        message: "Sua don hang that bai",
      });
    }
    return res.json({
      message: "Sua don hang thanh cong",
      order,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xoa don hang thanh cong",
      order,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
