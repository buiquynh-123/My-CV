import { IProduct } from "./product";

export interface ICategory {
  _id?: string;
  name?: string;
  products: IProduct;
}
export interface IProps {
  categories: ICategory[];
  onRemove: (id: string) => void;
}
export interface ICategoryAdd {
  onAdd: (category: ICategory) => void;
}
export interface ICategoryEdit {
  categories: ICategory[];
  onEdit: (category: ICategory) => void;
}
