/* eslint-disable @typescript-eslint/no-explicit-any */
import { craeteCart } from "../../api/cart";
import { createOrder } from "../../api/order-detail";
import { IOrderDetail } from "../../interface/order_detail";
import { IProduct } from "../../interface/product";
export const addToCart = (product: any) => {
  return async (dispatch: any) => {
    try {
      const { data } = await craeteCart(product);
      // const { items } = data.createCart;
      console.log(data.updateCart.items);
      const { ...item } = data.updateCart.items;
      console.log(item);
      dispatch({ type: "ADD_TO_CART", payload: item });
    } catch (error) {
      alert("Đã xảy ra lỗi: " + error);
    }
  };
};

export const deleteCart = (product: IProduct) => {
  return {
    type: "DELETE_CART",
    payload: product,
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
