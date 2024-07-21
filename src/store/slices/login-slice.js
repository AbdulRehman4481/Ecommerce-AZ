import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../constants/apiConfig/apiConfig";
import { API_ROUTES } from "../../constants/apiConfig/api.constant";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginFormData, { rejectWithValue }) => {
    try {
      const response = await API.POST(API_ROUTES?.auth?.login, loginFormData);
      const token = response?.data?.tokens?.access?.token;
      const userData = response?.data?.user;
      
      if (token) {
        localStorage.setItem('token', token);
      }
      
      return { userData, token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.userData;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || action.payload;
      });
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export const selectLoginStatus = (state) => state.login.status;
export const selectLoginError = (state) => state.login.error;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;