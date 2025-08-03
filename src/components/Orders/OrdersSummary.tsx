import { Paper, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { ORDER_STATUSES } from '../../constants/orderStatus';
import { type OrderStatus } from '../../types/orderTypes';

const OrderSummary = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);

  const statusCounts = orders.reduce<Record<OrderStatus, number>>(
    (acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    },
    {} as Record<OrderStatus, number>
  );

  const summaryData = [
    { label: 'Total Orders', value: totalOrders },
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}` },
    ...ORDER_STATUSES.map((status) => ({
      label: status.charAt(0).toUpperCase() + status.slice(1),
      value: statusCounts[status] || 0,
    })),
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {summaryData.map((item) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={item.label}
          {...({} as any)}
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: 'background.paper',
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Typography variant='subtitle2' color='text.secondary'>
              {item.label}
            </Typography>
            <Typography variant='h6' fontWeight={600}>
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderSummary;
