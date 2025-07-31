import { type Order } from '../../store/OrderSlices/orderTypes';
import { Card, Typography, Chip, Box, Divider } from '@mui/material';

const statusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'processing':
      return 'info';
    case 'shipped':
      return 'primary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <Card
      variant='outlined'
      sx={{
        height: 200,
        width: '100%',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease-in-out',
        p: 2,
        boxShadow: 1,
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-3px)',
        },
      }}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='subtitle1' fontWeight={700}>
          {order.customerName}
        </Typography>
        <Chip
          label={order.status}
          color={statusColor(order.status)}
          size='small'
          sx={{ textTransform: 'capitalize' }}
        />
      </Box>

      <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
        Order ID: {order.id}
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Box>
        <Typography variant='body2'>
          <strong>Total:</strong> ${order.total.toFixed(2)}
        </Typography>
        <Typography variant='body2'>
          <strong>Date:</strong>{' '}
          {new Date(order.orderDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Typography>
      </Box>
    </Card>
  );
};

export default OrderCard;
