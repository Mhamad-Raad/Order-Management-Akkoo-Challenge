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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { updateSingleOrderStatus } from '../../store/OrderSlices/orderSlice';

import {
  ORDER_STATUSES,
  STATUS_COLORS,
  STATUS_LABELS,
} from '../../constants/orderStatus';
import { type OrderStatus, type Order } from '../../types/orderTypes';

interface Props {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderModal = ({ open, onClose, order }: Props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [localStatus, setLocalStatus] = useState<OrderStatus | ''>('');

  useEffect(() => {
    setLocalStatus(order?.status ?? '');
  }, [order]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!order) return null;

  const handleStatusChange = (newStatus: OrderStatus) => {
    setLocalStatus(newStatus);
    dispatch(updateSingleOrderStatus({ id: order.id, status: newStatus }));
    enqueueSnackbar(`Order ${order.id} status updated to ${newStatus}`, {
      variant: 'success',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>{order.customerName}</Typography>
          <Chip
            label={STATUS_LABELS[localStatus as OrderStatus] || localStatus}
            color={STATUS_COLORS[localStatus as OrderStatus]}
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
          Update Status
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={localStatus}
            label='Status'
            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
          >
            {ORDER_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {STATUS_LABELS[status]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
