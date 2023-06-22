export interface IItem {
  product_id: string;
  quantity: number;
  size: string;
  color: string;
}
export interface ICartItems {
  customer_id: string;
  items: IItem[];
}
