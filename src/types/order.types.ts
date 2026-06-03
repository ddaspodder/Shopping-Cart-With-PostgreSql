import { STATUS } from "../../depreciated/constants/order.constants";

export interface OrderWithItemsRow {
  id: number;
  user_id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  total_amount: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}
export { STATUS };

export interface OrderItemResponse {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderResponse {
  id: string;
  userId: number;
  items: OrderItemResponse[];
  status: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
