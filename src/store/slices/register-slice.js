import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../constants/apiConfig/apiConfig";
import { API_ROUTES } from "../../constants/apiConfig/api.constant";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.POST(API_ROUTES?.auth?.register, formData);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || action.payload; 
      });
  },
});

export const selectAuthStatus = (state) => state.register.status;
export const selectAuthError = (state) => state.register.error;

export default authSlice.reducer;
