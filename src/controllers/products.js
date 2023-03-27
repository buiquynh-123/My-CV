import Joi from "joi";
import Product from "../models/product";
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number(),
});
export const getAll = async (req, res) => {
  try {
    // const { data } = await axios.get("http://localhost:3000/products");
    const data = await Product.find();
    if (data.length == 0) {
      return res.status(400).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    // await axios.delete(`http://localhost:3000/products/${req.params.id}`);
    const product = await Product.findByIdAndDelete(req.params.id);

    return res.json({
      message: "Da xoa thanh cong",
      product,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

export const add = async (req, res) => {
  try {
    const body = req.body;
    // console.log(body);
    const { error } = productSchema.validate(body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // const { data } = await axios.post("http://localhost:3000/products", body);
    const data = await Product.create(body);
    if (!data) {
      return res.status(400).json({ message: "Thêm sản phẩm thất bại" });
    }

    return res.json({
      message: "Da them thanh cong",
      data,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    // const { data } = await axios.put(
    //   `http:localhost:3000/products/${id}`,
    //   body
    // );
    const data = await Product.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (!data) {
      return res.status(400).json({
        message: "Them that bai",
      });
    }
    return res.json({
      message: "Da sua thanh cong",
      data,
    });
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    // const { data } = await axios.get(
    //   `http://localhost:3000/products/${req.params.id}`
    // );
    const data = await Product.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(400).json({
        message: "Khong tim thay san pham",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};
