import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
  error: null,
};

// Add Address
export const addAddress = createAsyncThunk(
  'address/addAddress',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/shop/address/add', 
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Fetch All Addresses
export const fetchAllAddress = createAsyncThunk(
  'address/fetchAllAddress',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/shop/address/get/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Edit Address
export const editAddress = createAsyncThunk(
  'address/editAddress',
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/shop/address/edit/${userId}/${addressId}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Delete Address
export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/shop/address/delete/${userId}/${addressId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList=action.payload.data;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.addressList=[];
      })
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList=[];
      })
     
  },
});

export default addressSlice.reducer;
