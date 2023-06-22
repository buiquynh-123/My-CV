/* eslint-disable @typescript-eslint/no-explicit-any */
import { craeteCart } from "../../api/cart";
import { createOrder } from "../../api/order-detail";
import { IOrderDetail } from "../../interface/order_detail";

export const addToCart = (product: any) => {
  return async (dispatch: any) => {
    try {
      const cartItem = await craeteCart(product);
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
    } catch (error) {
      alert("Đã xảy ra lỗi: " + error);
    }
  };
};

export const addOrder = (order: IOrderDetail) => {
  return async (dispatch: any) => {
    try {
      const orderItem = await createOrder(order);
      dispatch({ type: "ADD_ORDER_DETAIL", payload: orderItem });
    } catch (error: any) {
      alert("Đã xảy ra lỗi: " + error.message);
    }
  };
};
