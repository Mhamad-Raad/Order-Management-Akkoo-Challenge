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
        boxShadow: isDragging ? 6 : 1,
        transition: 'all 0.2s ease-in-out',
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Stack direction='row' alignItems='center' spacing={2}>
            <Checkbox checked={isSelected} onClick={handleCheckboxClick} />
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
          <Chip
            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            color={STATUS_COLORS[order.status]}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default React.memo(OrderCard);
