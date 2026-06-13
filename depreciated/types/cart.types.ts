export interface CartRow {
  id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CartItemRow {
  id: number;
  quantity: number;
}

export interface CartWithItemsRow {
  id: number;
  user_id: number;
  cart_id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface CartItemResponse {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
  id: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  items: CartItemResponse[];
}
