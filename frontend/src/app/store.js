import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import AuthReducer from '../features/auth/AuthSlice';
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice"
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: AuthReducer,
    cart: cartReducer,
    order: orderReducer,
    user:userReducer
  },
});
