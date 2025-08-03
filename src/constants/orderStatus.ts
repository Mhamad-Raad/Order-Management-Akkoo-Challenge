import { type StatusColor, type OrderStatus } from '../types/orderTypes';

export const ORDER_STATUSES = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export const STATUS_COLORS: Record<OrderStatus, StatusColor> = {
  pending: 'warning',
  processing: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'error',
};

export const STATUS_LABELS: Record<OrderStatus, string> = Object.fromEntries(
  ORDER_STATUSES.map((status) => [
    status,
    status.charAt(0).toUpperCase() + status.slice(1),
  ])
) as Record<OrderStatus, string>;
