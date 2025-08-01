import { useEffect, useState } from 'react';
import { Grid, Pagination, Box, Typography } from '@mui/material';
import ordersData from '../../data/mock-orders.json';
import OrderCard from './OrderCard';
import OrderModal from './OrderModal';
import FilterPanel from '../FilterPanel';
import SortBar from '../SortBar';
import { type Order } from '../../store/OrderSlices/orderTypes';
import dayjs, { Dayjs } from 'dayjs';

const ORDERS_PER_PAGE = 10;

const OrdersList = () => {
  const [allOrders] = useState<Order[]>(ordersData.orders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [visibleOrders, setVisibleOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);

  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [amountRange, setAmountRange] = useState<number[]>([0, 1000]);
  const [customStartDate, setCustomStartDate] = useState<Dayjs | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Dayjs | null>(null);

  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedOrder(null);
    setOpen(false);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const resetFilters = () => {
    setStatus('all');
    setSearchTerm('');
    setDateRange('all');
    setAmountRange([0, 1000]);
    setCustomStartDate(null);
    setCustomEndDate(null);
  };

  const handleSortChange = (key: string) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  const resetSorting = () => {
    setSortBy('');
    setSortDirection('asc');
  };

  const matchesDateRange = (date: string): boolean => {
    const orderDate = dayjs(date);
    const now = dayjs();

    if (dateRange === 'today') return orderDate.isSame(now, 'day');
    if (dateRange === 'week') return orderDate.isAfter(now.subtract(7, 'day'));
    if (dateRange === 'month')
      return orderDate.isAfter(now.subtract(1, 'month'));
    if (dateRange === 'custom') {
      if (customStartDate && customEndDate) {
        return (
          orderDate.isAfter(customStartDate.subtract(1, 'day')) &&
          orderDate.isBefore(customEndDate.add(1, 'day'))
        );
      }
    }

    return true;
  };

  const filterOrders = () => {
    return allOrders
      .filter((order) => {
        const matchStatus = status === 'all' || order.status === status;
        const matchSearch =
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchDate = matchesDateRange(order.orderDate);
        const matchAmount =
          order.total >= amountRange[0] && order.total <= amountRange[1];

        return matchStatus && matchSearch && matchDate && matchAmount;
      })
      .sort((a, b) => {
        if (!sortBy) return 0;

        let valA: string | number = '';
        let valB: string | number = '';

        switch (sortBy) {
          case 'date':
            valA = new Date(a.orderDate).getTime();
            valB = new Date(b.orderDate).getTime();
            break;
          case 'amount':
            valA = a.total;
            valB = b.total;
            break;
          case 'customer':
            valA = a.customerName.toLowerCase();
            valB = b.customerName.toLowerCase();
            break;
          case 'status':
            valA = a.status;
            valB = b.status;
            break;
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  };

  useEffect(() => {
    const filtered = filterOrders();
    setFilteredOrders(filtered);
    setPage(1);
  }, [
    status,
    searchTerm,
    dateRange,
    amountRange,
    customStartDate,
    customEndDate,
    sortBy,
    sortDirection,
  ]);

  useEffect(() => {
    const start = (page - 1) * ORDERS_PER_PAGE;
    const end = start + ORDERS_PER_PAGE;
    setVisibleOrders(filteredOrders.slice(start, end));
  }, [page, filteredOrders]);

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  return (
    <>
      <FilterPanel
        status={status}
        onStatusChange={setStatus}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        amountRange={amountRange}
        onAmountChange={setAmountRange}
        customStartDate={customStartDate}
        customEndDate={customEndDate}
        onStartDateChange={setCustomStartDate}
        onEndDateChange={setCustomEndDate}
      />

      <SortBar
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        onResetSort={resetSorting}
      />

      {filteredOrders.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {visibleOrders.map((order) => (
              <Grid
                item
                key={order.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                display='flex'
                onClick={() => handleOpen(order)}
                sx={{ cursor: 'pointer' }}
                {...({} as any)}
              >
                <OrderCard order={order} />
              </Grid>
            ))}
          </Grid>

          <Box mt={4} display='flex' justifyContent='center'>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color='primary'
            />
          </Box>
        </>
      ) : (
        <Box mt={6} textAlign='center' width='100%'>
          <Typography variant='h6' gutterBottom>
            No orders match the selected filters.
          </Typography>
          <Typography variant='body2' color='text.secondary' mb={2}>
            Try adjusting your filters or search terms.
          </Typography>
          <Box display='flex' justifyContent='center'>
            <Box
              component='button'
              onClick={resetFilters}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Reset Filters
            </Box>
          </Box>
        </Box>
      )}

      <OrderModal open={open} onClose={handleClose} order={selectedOrder} />
    </>
  );
};

export default OrdersList;
