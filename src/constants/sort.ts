import { type SortKey } from '../types/filterTypes';

export const SORT_OPTIONS: readonly SortKey[] = ['date', 'amount', 'customer'];

export const SORT_LABELS: Record<SortKey, string> = {
  date: 'Date',
  amount: 'Amount',
  customer: 'Customer',
};
