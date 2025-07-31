import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { type RootState } from '../../store';
import OrderCard from './OrderCard';
import OrderModal from './OrderModal';
import { type Order } from '../../store/OrderSlices/orderTypes';

const OrdersList = () => {
  const orders = useSelector((state: RootState) => state.orders.data);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Grid container spacing={3}>
        {orders.map((order) => (
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

      <OrderModal open={open} onClose={handleClose} order={selectedOrder} />
    </>
  );
};

export default OrdersList;
