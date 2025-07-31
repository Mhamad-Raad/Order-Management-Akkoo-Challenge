import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { type Order } from '../../store/OrderSlices/orderTypes';

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

interface Props {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderModal = ({ open, onClose, order }: Props) => {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>{order.customerName}</Typography>
          <Chip
            label={order.status}
            color={statusColor(order.status)}
            size='small'
          />
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant='body2' color='text.secondary' gutterBottom>
          Order ID: {order.id}
        </Typography>

        <Typography variant='body1' sx={{ mt: 1 }}>
          <strong>Total:</strong> ${order.total.toFixed(2)}
        </Typography>
        <Typography variant='body1'>
          <strong>Date:</strong>{' '}
          {new Date(order.orderDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant='subtitle1' gutterBottom>
          Items
        </Typography>
        <List dense>
          {order.items.map((item) => (
            <ListItem key={item.id} disableGutters>
              <ListItemText
                primary={`${item.name} × ${item.quantity}`}
                secondary={`$${item.price.toFixed(2)} — SKU: ${item.sku}`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant='subtitle1' gutterBottom>
          Shipping Address
        </Typography>
        <Typography variant='body2'>
          {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
          {order.shippingAddress.state} {order.shippingAddress.zipCode},{' '}
          {order.shippingAddress.country}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
