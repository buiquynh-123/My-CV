import Joi from "joi";
import Product from "../models/product";
import Category from "../models/category";
// import cloudinary from "../utils/cloudinary";
import cloudinary from "../config/cloudinaryConfig";

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number(),
  images: Joi.array(),
  category_id: Joi.string().required(),
});
export const getAll = async (req, res) => {
  // products: 10, sort price, order desc, asc
  // GET /products?_sort=price&_order=asc&limit=10

  const {
    _sort = "createAt",
    _order = "asc",
    _limit = 10,
    _page = 1,
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order == "desc" ? -1 : 1,
    },
  };
  try {
    // const { data } = await axios.get("http://localhost:3000/products");
    const { docs, totalDocs, totalPages } = await Product.paginate({}, options);
    if (docs.length == 0) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({ data: docs, totalDocs, totalPages });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const productItem = await Product.findById(req.params.id);
    await productItem.images.forEach((item) => {
      cloudinary.uploader.destroy(item.publicId);
    });
    const product = await Product.findByIdAndDelete(req.params.id);

    return res.json({
      message: "Đã xóa sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const add = async (req, res) => {
  try {
    const images = req.files.map((file) => file.path);
    const uploadedImages = [];
    for (const image of images) {
      try {
        const result = await cloudinary.uploader.upload(image);
        uploadedImages.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      } catch (error) {
        console.log("error: " + error);
      }
    }
    const body = {
      ...req.body,
      images: uploadedImages,
    };

    const { error } = productSchema.validate(body);
    if (error) {
      if (images) {
        uploadedImages.forEach((item) => {
          const { url, ...publicId } = item;
          cloudinary.uploader.destroy(publicId);
        });
      }
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors.message,
      });
    }
    const product = await Product.create(body);
    console.log(product);
    await Category.findByIdAndUpdate(product.category_id, {
      $addToSet: {
        products: product._id,
      },
    });
    if (!product) {
      return res.status(400).json({ message: "Thêm sản phẩm thất bại" });
    }

    return res.json({
      message: "Thêm sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    let result = null;
    if (req?.file?.path) {
      await cloudinary.uploader.destroy(product?.cloudinary_id);
      result = await cloudinary.uploader.upload(req?.file?.path);
    }
    const data = {
      ...req.body,
      image: result?.secure_url || product.image,
      cloudinary_id: result?.public_id || product.cloudinary_id,
    };
    product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!product) {
      return res.status(400).json({
        message: "Sửa sản phẩm thất bại",
      });
    }
    return res.json({
      message: "Sửa sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.params.id }).populate({
      path: "category_id",
    });
    if (!data) {
      return res.status(400).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const search = async (req, res) => {
  console.log(req.body);
  const query = {
    $or: [
      { name: { $regex: req.body.searchQuery.toLowerCase(), $options: "i" } },
      {
        description: {
          $regex: req.body.searchQuery.toLowerCase(),
          $options: "i",
        },
      },
    ],
  };

  const cursor = await Product.find(query);
  console.log("result: " + cursor);
  if (!cursor) {
    return res.status(400).json({
      message: "Khong tim thay san pham",
    });
  }
  return res.status(200).json({ cursor });
};
