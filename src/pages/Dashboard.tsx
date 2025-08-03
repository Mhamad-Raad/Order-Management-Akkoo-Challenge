import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadOrders } from '../store/OrderSlices/orderSlice';

import ordersData from '../data/mock-orders.json';

import { type RootState } from '../store';
import { type Order } from '../store/OrderSlices/orderTypes';

import OrderBoard from '../components/Orders/OrderBoard';
import OrderModal from '../components/Orders/OrderModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);

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
    if (orders.length === 0) {
      dispatch(loadOrders(ordersData.orders));
    }
  }, [dispatch, orders.length]);

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
