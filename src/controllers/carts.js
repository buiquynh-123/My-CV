import Cart from "../models/cart";
import Product from "../models/product";
export const getAll = async (req, res) => {
  // const customer_id = req.customerId
  try {
    const customerId = "64468bfce29d0f11590e8f73";
    // Lấy danh sách sản phẩm trong giỏ hàng của khách hàng cụ thể
    const cartItem = await Cart.findOne({ customer_id: customerId }).populate({
      path: "items.product_id",
    });

    console.log("cartItems: " + cartItem);

    return res.status(200).json(cartItem);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const cart = await Cart.findOne({ _id: req.params.id })
      .populate("customer_id")
      .populate("items.product_id");

    if (!cart) {
      return res.status(400).json({
        message: "Khong tim thay",
      });
    }
    return res.status(200).json({ cart });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const customerId = req.body.customer_id;
    const productId = req.body.items[0].product_id;
    const quantity = req.body.items[0].quantity || 0;
    const size = req.body.items[0].size || "";
    const color = req.body.items[0].color || "";

    console.log("customerId: " + customerId);
    console.log("productId: " + productId);
    console.log("quantity: " + req.body.items[0].quantity);

    const cart = await Cart.findOne({ customer_id: customerId });

    console.log("cart: " + cart);
    if (!cart) {
      // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới
      const createCart = await Cart.create({
        customer_id: customerId,
        items: [
          {
            product_id: productId,
            quantity: quantity,
            size: size,
            color: color,
          },
        ],
      });
      console.log("không");
      if (!createCart) {
        res.status(400).json({ message: "Internal server error" });
      }
      res.json({ createCart });
    }

    const item = await cart.items.find((item) => item.product_id == productId);
    // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
    if (item) {
      console.log("có item");
      const newQuantity = item.quantity + parseInt(quantity);
      const createCart = await Cart.findOneAndUpdate(
        { customer_id: customerId },
        {
          items: {
            product_id: productId,
            quantity: newQuantity,
            size: size,
            color: color,
          },
        },
        { new: true, upsert: true }
      );
      res.json({ createCart });
    }
    if (!item) {
      console.log("khong co item");
      const createCart = await Cart.findOneAndUpdate(
        { customer_id: customerId },
        {
          $addToSet: {
            items: {
              product_id: productId,
              quantity: quantity,
              size: size,
              color: color,
            },
          },
        },
        { new: true, upsert: true }
      );
      console.log("createCart: " + createCart);
      if (!createCart) {
        res.status(400).json({ message: "Internal server error" });
      }
      res.json({ createCart });
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const quantity = req.body.items[0].quantity;
    const size = req.body.items[0].size;
    const color = req.body.items[0].color;

    console.log(quantity);
    const cartItem = await Cart.findOne({ _id: req.params.id });
    console.log("cartItem: " + cartItem);
    const data = {
      customer_id: cartItem?.customer_id,
      items: {
        product_id: cartItem.items[0].product_id,
        quantity: quantity || cartItem.items[0].quantity,
        size: size || cartItem.items[0].size,
        color: color || cartItem.items[0].color,
      },
    };
    console.log(data);
    const cart = await Cart.findOneAndUpdate(
      { customer_id: cartItem?.customer_id },
      data,
      { new: true }
    );
    console.log("cart: " + cart);
    if (!cart) {
      return res.status(400).json({
        message: "Sửa thông tin sản phẩm trong giỏ hàng thất bại",
      });
    }
    return res.json({
      message: "Sửa thông tin sản phẩm trong giỏ hàng thành công",
      cart,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};
export async function remove(req, res, next) {
  try {
    const { product_id } = req.params;
    const { _id: userId } = req.user;

    const cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      return res.status(400).json({
        mesage: "Sản phẩm không tồn tại",
      });
    }

    // xóa sản phẩm ra khỏi giỏ hàng
    const updateCart = await Cart.findOneAndUpdate(
      {
        userId,
      },
      {
        $pull: {
          products: {
            product_id,
          },
        },
      },
      {
        new: true,
      }
    );

    return res.json({
      message: "Xóa sản phẩm thành công",
      data: updateCart,
    });
  } catch (error) {
    next(error);
  }
}
