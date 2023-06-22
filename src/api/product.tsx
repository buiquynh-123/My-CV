import instance from "./instance";
import { IProduct } from "../interface/product";
// const { accessToken } = JSON.parse(localStorage.getItem("users")!);
const getAllProduct = () => {
  return instance.get("products");
};
const search = (searchQuery: any) => {
  return instance.post("search", { searchQuery: searchQuery });
};

const getOneProduct = (id: string) => {
  return instance.get("products/" + id);
};

const deleteProduct = (id: string) => {
  return instance.delete("products/" + id, {
    headers: {
      // Authorization: `Bearer ${accessToken}`,
    },
  });
};
const updateProduct = (product: IProduct, id: string) => {
  console.log(product);
  return instance.put(`products/${id}`, product, {
    headers: {
      // Authorization: `Bearer ${accessToken}`,
    },
  });
};
const addProduct = (product: IProduct) => {
  return instance.post("products", product, {
    headers: {
      "content-type": "multipart/form-data",
      // Authorization: `Bearer ${accessToken}`,
    },
  });
};

export {
  getAllProduct,
  search,
  getOneProduct,
  addProduct,
  deleteProduct,
  updateProduct,
};
