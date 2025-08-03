import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress, Box, Typography } from '@mui/material';

import { loadOrders } from '../store/OrderSlices/orderSlice';
import { subscribeToOrders } from '../utils/ordersFirestore';
import { useSnackbar } from 'notistack';

import { type Order } from '../types/orderTypes';
import OrderBoard from '../components/Orders/OrderBoard';
import OrderModal from '../components/Orders/OrderModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  useEffect(() => {
    const unsubscribe = subscribeToOrders(
      (fetchedOrders) => {
        dispatch(loadOrders(fetchedOrders));
        setLoading(false);
      },
      () => {
        enqueueSnackbar('Failed to fetch orders from Firestore', {
          variant: 'error',
        });
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [dispatch, enqueueSnackbar]);

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='70vh'
        flexDirection='column'
      >
        <CircularProgress />
        <Typography mt={2}>Loading orders...</Typography>
      </Box>
    );
  }

  return (
    <>
      <OrderBoard openModal={handleOpenModal} />
      {selectedOrder && (
        <OrderModal
          open={modalOpen}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
      )}
    </>
  );
};

export default Dashboard;
