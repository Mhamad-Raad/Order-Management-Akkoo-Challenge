import { useDraggable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import OrderCard from './OrderCard';
import { type Order } from '../../store/OrderSlices/orderTypes';

interface Props {
  order: Order;
}

const DraggableOrderCard = ({ order }: Props) => {
  if (!order) return null;

  const { setNodeRef, listeners, attributes } = useDraggable({
    id: order.id,
    data: { ...order },
  });

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{ cursor: 'grab' }}
    >
      <OrderCard order={order} />
    </Box>
  );
};

export default DraggableOrderCard;
