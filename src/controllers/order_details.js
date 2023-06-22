import Order from "../models/order";
import orderDetail from "../models/order_details";
import Product from "../models/product";

export const getAll = async (req, res) => {
  const {
    _sort = "createAt",
    _order = "asc",
    _limit = 10,
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
    const { docs, totalDocs, totalPages } = await orderDetail.paginate(
      {},
      options
    );
    console.log("docs: " + docs);
    if (docs.length == 0) {
      return res.status(400).json({
        message: "Khong tim thay san pham",
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
    const data = await orderDetail
      .findOne({ _id: req.params.id })
      .populate({ path: "order_id" });
    if (!data) {
      return res.status(400).json({
        message: "Khong tim thay san pham",
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
    const { product_id, quantity } = req.body;

    const product = await Product.findOne({
      _id: product_id,
    });
    console.log("product: " + product);
    if (!product) {
      return res.status(400).json({
        message: "Khong tim thay san pham",
      });
    }
    const orderItem = await orderDetail.create({
      product_id: product_id,
      quantity: quantity,
      price: product?.price,
      description: product?.description,
      images: product?.images,
    });
    console.log("orderItem: " + orderItem);
    if (!orderItem) {
      return res.status(400).json({
        message: "Tao san pham chi tiet that bai",
      });
    }
    return res.json({
      message: "tao san pham chi tiet thanh cong",
      orderItem,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const quantity = req.body.quantity;
    const orderItem = await orderDetail.findByIdAndUpdate(
      req.params.id,
      quantity,
      { new: true }
    );
    if (!orderItem) {
      return res.status(400).json({
        message: "Sua don hang that bai",
      });
    }
    return res.json({
      message: "Sua don hang thanh cong",
      orderItem,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const orderDetail = await orderDetail.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xoa don hang thanh cong",
      orderDetail,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
