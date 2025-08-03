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
