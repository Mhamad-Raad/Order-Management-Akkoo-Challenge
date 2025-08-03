export const STATUS_OPTIONS = [
  'all',
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export const DATE_RANGE_OPTIONS = [
  'all',
  'today',
  'week',
  'month',
  'custom',
] as const;

export const SORT_OPTIONS = ['date', 'amount', 'customer', 'status'] as const;

export const SORT_LABELS: Record<string, string> = {
  date: 'Date',
  amount: 'Amount',
  customer: 'Customer',
  status: 'Status',
};

// order status colors and labels
export type StatusColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export const STATUS_COLORS: Record<
  'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  StatusColor
> = {
  pending: 'warning',
  processing: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'error',
};

export const STATUS_LABELS: Record<
  'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  string
> = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};
