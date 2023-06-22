import instance from "./instance";
import { ICategory } from "../interface/category";
export const getAllCategory = () => {
  return instance.get("categories");
};
export const getOneCategory = (id: string) => {
  return instance.get("categories/" + id);
};
export const addCategory = (category: ICategory) => {
  return instance.post("categories", category);
};
export const editCategory = (category: ICategory) => {
  return instance.put("categories/" + category._id, category);
};
export const removeCategory = (id: string) => {
  return instance.delete("categories/" + id);
};
