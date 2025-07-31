import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import OrderCard from './OrderCard';

const OrdersList = () => {
  const orders = useSelector((state: RootState) => state.orders.data);

  return (
    <Grid container spacing={3}>
      {orders.map((order) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={order.id} {...({} as any)}>
          <OrderCard order={order} />
        </Grid>
      ))}
    </Grid>
  );
};

export default OrdersList;
