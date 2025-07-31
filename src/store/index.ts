import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './OrderSlices/orderSlice';
import themeReducer from './ThemeSlices/themeSlice';

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
