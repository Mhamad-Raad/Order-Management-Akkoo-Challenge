import { Paper, Typography, Pagination, Stack } from '@mui/material';
import React, { useState, useMemo, useEffect } from 'react';
import DraggableOrderCard from './DraggableOrderCard';
import { useDroppable } from '@dnd-kit/core';
import { type Order } from '../../types/orderTypes';

interface Props {
  status: string;
  orders: Order[];
  onOpenModal: (order: Order) => void;
  activeOrder: Order | null;
}

const StatusColumn = ({ status, orders, onOpenModal, activeOrder }: Props) => {
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: status,
  });

  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginated = useMemo(() => {
    return orders.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [orders, page]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  return (
    <Paper
      ref={setDropRef}
      elevation={3}
      sx={{
        p: 2,
        height: '700px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        bgcolor: isOver ? 'action.hover' : 'background.paper',
        transition: 'background-color 0.2s ease-in-out',
      }}
    >
      <Typography
        variant='subtitle1'
        fontWeight={600}
        textTransform='capitalize'
        sx={{ textAlign: 'center' }}
      >
        {status} ({orders.length})
      </Typography>

      {paginated.map((order) => (
        <DraggableOrderCard
          key={order.id}
          order={order}
          onOpenModal={onOpenModal}
          ghost={activeOrder?.id === order.id}
        />
      ))}

      <Stack direction='row' justifyContent='center' sx={{ mt: 'auto' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, val) => setPage(val)}
          size='small'
        />
      </Stack>
    </Paper>
  );
};

export default React.memo(StatusColumn);
