export interface IOrderDetail {
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  images: Array<object>;
  description: string;
}
