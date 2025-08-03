export const ORDER_STATUSES = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type StatusFilter = 'all' | OrderStatus;

export const STATUS_OPTIONS: readonly StatusFilter[] = [
  'all',
  ...ORDER_STATUSES,
];

// 4. Color mapping
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

export const DATE_RANGE_OPTIONS = [
  'all',
  'today',
  'week',
  'month',
  'custom',
] as const;

export const SORT_OPTIONS = ['date', 'amount', 'customer', 'status'] as const;
export type SortKey = (typeof SORT_OPTIONS)[number];

export const SORT_LABELS: Record<SortKey, string> = {
  date: 'Date',
  amount: 'Amount',
  customer: 'Customer',
  status: 'Status',
};

export type StatusColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';
