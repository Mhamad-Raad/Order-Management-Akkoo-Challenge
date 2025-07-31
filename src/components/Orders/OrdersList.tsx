import { useEffect, useState } from 'react';
import { Grid, Pagination, Box } from '@mui/material';
import ordersData from '../../data/mock-orders.json'; // simulate backend
import OrderCard from './OrderCard';
import OrderModal from './OrderModal';
import { type Order } from '../../store/OrderSlices/orderTypes';

const ORDERS_PER_PAGE = 10;

const OrdersList = () => {
  const [allOrders] = useState<Order[]>(ordersData.orders); // mock DB
  const [visibleOrders, setVisibleOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    const start = (page - 1) * ORDERS_PER_PAGE;
    const end = start + ORDERS_PER_PAGE;
    setVisibleOrders(allOrders.slice(start, end));
  }, [page, allOrders]);

  const totalPages = Math.ceil(allOrders.length / ORDERS_PER_PAGE);

  return (
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

      <OrderModal open={open} onClose={handleClose} order={selectedOrder} />
    </>
  );
};

export default OrdersList;
