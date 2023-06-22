import { ICategory } from "./category";

export interface IProduct {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  images?: Array<object>;
  cloudinary_id?: string;
  category_id?: string;
}

export interface IProductOne {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  image?: string;
  category_id?: ICategory;
}
export interface IProps {
  products: IProduct[];
  onRemove: (id: string) => void;
  onSearch: (id: string) => void;
}
export interface IPropsAdd {
  onAdd: (product: IProduct) => void;
}
export interface IParams {
  id: string;
}

export interface ProductPageProps {
  products: IProduct[];
  categories: ICategory[];
}

export interface ProductEditProps {
  products: IProduct[];
  categories: ICategory[];
  handleEdit: (product: any, id: string) => void;
}
export interface ProductAddProps {
  onAdd: (product: IProduct) => void;
  categories: ICategory[];
}
