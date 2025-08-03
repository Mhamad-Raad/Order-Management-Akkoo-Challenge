import { useDraggable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import OrderCard from './OrderCard';
import { type Order } from '../../store/OrderSlices/orderTypes';

interface Props {
  order: Order;
  onOpenModal: (order: Order) => void;
  ghost?: boolean;
}

const DraggableOrderCard = ({ order, onOpenModal, ghost }: Props) => {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
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
      <OrderCard
        order={order}
        onOpenModal={onOpenModal}
        isGhost={ghost}
        isDragging={isDragging}
      />
    </Box>
  );
};

export default DraggableOrderCard;
