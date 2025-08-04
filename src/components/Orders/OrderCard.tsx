import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Chip,
  Stack,
  useTheme,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectOrder } from '../../store/OrderSlices/orderSlice';
import { type Order } from '../../types/orderTypes';
import { type RootState } from '../../store';
import React from 'react';

import { STATUS_COLORS } from '../../constants/orderStatus';

interface Props {
  order: Order;
  onOpenModal?: (order: Order) => void;
  isGhost?: boolean;
  isDragging?: boolean;
}

const OrderCard = ({
  order,
  onOpenModal,
  isGhost = false,
  isDragging = false,
}: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedOrders = useSelector(
    (state: RootState) => state.orders.selectedOrders
  );
  const isSelected = selectedOrders.includes(order.id);

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleSelectOrder(order.id));
  };

  const handleCardClick = () => {
    if (onOpenModal) {
      onOpenModal(order);
    }
  };

  return (
    <Card
      variant='outlined'
      role='checkbox'
      aria-checked={isSelected}
      sx={{
        mb: 2,
        cursor: 'pointer',
        opacity: isGhost ? 0.3 : 1,
        transform: isDragging ? 'rotate(2deg)' : 'none',
        boxShadow: isDragging ? 6 : 2,
        borderRadius: 1,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: 4,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.04)'
              : 'rgba(0,0,0,0.03)',
        },
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ py: 2 }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
        >
          <Stack direction='row' spacing={2} alignItems='center'>
            <Checkbox
              checked={isSelected}
              onClick={handleCheckboxClick}
              size='small'
              name='selectOrder'
            />
            <Stack spacing={0.5}>
              <Typography variant='subtitle1' fontWeight={600}>
                {order.customerName}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {new Date(order.orderDate).toLocaleString()}
              </Typography>
              <Typography variant='body2'>
                Total: ${order.total.toFixed(2)}
              </Typography>
            </Stack>
          </Stack>

          <Chip
            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            color={STATUS_COLORS[order.status]}
            size='small'
            sx={{
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default React.memo(OrderCard);
