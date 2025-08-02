import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders } from '../store/OrderSlices/orderSlice';
import ordersData from '../data/mock-orders.json';
import { type RootState } from '../store';

import OrderBoard from '../components/Orders/OrderBoard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(loadOrders(ordersData.orders));
    }
  }, [dispatch, orders.length]);

  return <OrderBoard />;
};

export default Dashboard;
