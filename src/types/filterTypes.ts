import { type OrderStatus } from './orderTypes';

export type StatusFilter = 'all' | OrderStatus;
export type DateRangeType = 'all' | 'today' | 'week' | 'month' | 'custom';
export type SortKey = 'date' | 'amount' | 'customer';
