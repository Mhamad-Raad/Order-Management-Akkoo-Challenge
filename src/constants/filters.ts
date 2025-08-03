import { ORDER_STATUSES } from './orderStatus';
import { type StatusFilter, type DateRangeType } from '../types/filterTypes';

export const STATUS_OPTIONS: readonly StatusFilter[] = [
  'all',
  ...ORDER_STATUSES,
];

export const DATE_RANGE_OPTIONS: readonly DateRangeType[] = [
  'all',
  'today',
  'week',
  'month',
  'custom',
];
