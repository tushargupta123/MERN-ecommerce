import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder, fetchAllOrders, updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
  totalOrders: 0,
};

export const addOrderAsync = createAsyncThunk(
  'order/addOrder',
  async (data) => {
    const response = await addOrder(data);
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (pagination) => {
    const response = await updateOrder(pagination);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers:{
    resetOrder: (state) => {
      state.currentOrder = null;
    }
  },
 extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(item=> item.id === action.payload.id)
        state.orders[index] = action.payload;
      })
  },
});
export const {resetOrder} = orderSlice.actions;
export const selectUserOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
