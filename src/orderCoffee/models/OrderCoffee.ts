export interface OrderCoffee {
  order_coffee_id: number;
  order_id: number;
  coffee_id: number;
  quantity: number;
  price: number;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  deleted: boolean;
}