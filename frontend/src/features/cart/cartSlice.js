import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemsFromCart, fetchItemsByUserId, resetCart, update } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle'
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async () => {
    const response = await fetchItemsByUserId();
    return response.data;
  }
);
export const updateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async (item) => {
    const response = await update(item);
    return response.data;
  }
);
export const deleteItemsFromCartAsync = createAsyncThunk(
  'cart/deleteItemsFromCart',
  async (itemId) => {
    const response = await deleteItemsFromCart(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
 extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = (action.payload);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id===action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteItemsFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemsFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id===action.payload.id)
        state.items.splice(index,1);
      })
  },
});

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
