import instance from "./instance";
import { IOrderDetail } from "../interface/order_detail";
export const getOrderById = (id: string) => {
  return instance.get(`order_details/${id}`);
};

export const createOrder = (order: IOrderDetail) => {
  return instance.post("order_details", order);
};
