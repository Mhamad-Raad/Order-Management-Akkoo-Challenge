
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Order } from './orderTypes';

interface OrdersState {
  data: Order[];
}

const initialState: OrdersState = {
  data: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    loadOrders: (state, action: PayloadAction<Order[]>) => {
      state.data = action.payload;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const order = state.data.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const { loadOrders, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
