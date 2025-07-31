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
  },
});

export const { loadOrders } = orderSlice.actions;
export default orderSlice.reducer;
