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

export type StatusColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

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
