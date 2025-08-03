import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Order, type OrderStatus } from '../../types/orderTypes';

interface OrderState {
  orders: Order[];
  selectedOrders: string[];
}

const initialState: OrderState = {
  orders: [],
  selectedOrders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    loadOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    updateSingleOrderStatus(
      state,
      action: PayloadAction<{ id: string; status: OrderStatus }>
    ) {
      const { id, status } = action.payload;
      state.orders = state.orders.map((order) =>
        order.id === id ? { ...order, status } : order
      );
    },
    toggleSelectOrder(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.selectedOrders.includes(id)) {
        state.selectedOrders = state.selectedOrders.filter((i) => i !== id);
      } else {
        state.selectedOrders.push(id);
      }
    },
    selectAllOrders(state, action: PayloadAction<string[]>) {
      state.selectedOrders = Array.from(
        new Set([...state.selectedOrders, ...action.payload])
      );
    },
    deselectAllOrders(state) {
      state.selectedOrders = [];
    },
    bulkUpdateStatus(state, action: PayloadAction<OrderStatus>) {
      const newStatus = action.payload;
      state.orders = state.orders.map((order) =>
        state.selectedOrders.includes(order.id)
          ? { ...order, status: newStatus }
          : order
      );
      state.selectedOrders = [];
    },
  },
});

export const {
  loadOrders,
  updateSingleOrderStatus,
  toggleSelectOrder,
  selectAllOrders,
  deselectAllOrders,
  bulkUpdateStatus,
} = orderSlice.actions;

export default orderSlice.reducer;
