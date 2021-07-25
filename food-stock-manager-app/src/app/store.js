import { configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';
import stockReducer from '../features/stock/stockReducer.js';
import loginReducer from '../features/login/loginReducer.js';

export const store = configureStore({
  reducer: {
    stock: stockReducer,
    login: loginReducer
  },
  middleware: [ReduxThunk]
});
