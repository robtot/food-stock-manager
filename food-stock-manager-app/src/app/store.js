import { configureStore } from '@reduxjs/toolkit';
import stockReducer from '../features/stock/stockReducer.js';

export const store = configureStore({
  reducer: {
    stock: stockReducer,
  },
});
