import { type Order } from '../../store/OrderSlices/orderTypes';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
} from '@mui/material';

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
        height: '100%',
        transition: '0.2s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='subtitle1' fontWeight={600}>
            {order.customerName}
          </Typography>
          <Chip
            label={order.status}
            color={statusColor(order.status)}
            size='small'
          />
        </Box>

        <Typography variant='body2' color='text.secondary' gutterBottom>
          Order ID: {order.id}
        </Typography>

        <Divider sx={{ my: 1 }} />

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
      </CardContent>
    </Card>
  );
};

export default OrderCard;
