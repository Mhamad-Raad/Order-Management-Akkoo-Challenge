export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  sku: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderDate: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}
