import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadOrders } from '../store/OrderSlices/orderSlice';
import { subscribeToOrders } from '../utils/ordersFirestore';

import { type Order } from '../store/OrderSlices/orderTypes';

import OrderBoard from '../components/Orders/OrderBoard';
import OrderModal from '../components/Orders/OrderModal';

const Dashboard = () => {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  useEffect(() => {
    const unsubscribe = subscribeToOrders((fetchedOrders) => {
      dispatch(loadOrders(fetchedOrders));
    });
    return () => unsubscribe();
  }, [dispatch]);

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
