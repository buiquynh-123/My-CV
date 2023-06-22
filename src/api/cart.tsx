import instance from "./instance";
import { ICartItems } from "../interface/cart";
export const getAll = () => {
  return instance.get("carts");
};
export const craeteCart = (cart: ICartItems) => {
  return instance.post("carts", cart);
};
export const updateCart = (quantity: number, id: string) => {
  return instance.put(`carts/${id}`, quantity);
};
export const deleteCart = (id: string) => {
  return instance.delete("carts/" + id);
};
