import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerece-server.vercel.app/v1/auth/login",
        loginFormData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    status: "idle",  
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || action.payload;  
      });
  },
});

export const selectLoginStatus = (state) => state.login.status;
export const selectLoginError = (state) => state.login.error;

export default loginSlice.reducer;
