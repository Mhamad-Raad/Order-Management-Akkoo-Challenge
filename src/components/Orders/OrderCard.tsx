import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Chip,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectOrder } from '../../store/OrderSlices/orderSlice';
import { type Order } from '../../store/OrderSlices/orderTypes';
import { type RootState } from '../../store';

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
  const dispatch = useDispatch();
  const selectedOrders = useSelector(
    (state: RootState) => state.orders.selectedOrders
  );

  return (
    <Card variant='outlined' sx={{ mb: 2 }}>
      <CardContent>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Stack direction='row' alignItems='center' spacing={2}>
            <Checkbox
              checked={selectedOrders.includes(order.id)}
              onClick={(e) => e.stopPropagation()}
              onChange={() => dispatch(toggleSelectOrder(order.id))}
            />
            <div>
              <Typography variant='h6'>{order.customerName}</Typography>
              <Typography variant='body2' color='text.secondary'>
                {new Date(order.orderDate).toLocaleString()}
              </Typography>
              <Typography variant='body2'>
                Total: ${order.total.toFixed(2)}
              </Typography>
            </div>
          </Stack>
          <Chip label={order.status} color={statusColor(order.status)} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
