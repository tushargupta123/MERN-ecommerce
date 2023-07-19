import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser, signOut } from './AuthAPI';

const initialState = {
  loggedInUserToken: null,
  status: 'idle',
  error:null,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (userData,{rejectWithValue}) => {
    try{
      const response = await loginUser(userData);
      return response.data;
    }catch(err){
      return rejectWithValue(err);
    }
  }
);
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (id) => {
    const response = await signOut(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
 extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        localStorage.setItem('token',action.payload)
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        localStorage.setItem('token',action.payload)
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
        localStorage.removeItem('token')
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;

export default userSlice.reducer;
