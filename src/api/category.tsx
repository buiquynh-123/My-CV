import instance from "./instance";
const getCategory = () => {
  return instance.get("categories");
};
const getCategoryById = (id: string | number) => {
  return instance.get(`categories/${id}`);
};

export { getCategory, getCategoryById };
