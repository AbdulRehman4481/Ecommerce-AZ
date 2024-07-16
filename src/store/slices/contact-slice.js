import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendContactForm = createAsyncThunk(
  'form/sendContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/v1/contact', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: {
      name: '',
      email: '',
      subjects: '',
      message: ''
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    updateFormData(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactForm.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendContactForm.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;

      })
      .addCase(sendContactForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || action.payload;

      });
  },
});

export const { updateFormData } = formSlice.actions;


export default formSlice.reducer;
