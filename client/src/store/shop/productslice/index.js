import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk for Fetching Products
export const fetchAllFilteredProduct = createAsyncThunk(
    "products/fetchAllFilteredProducts", // Updated name for better consistency
    async (_, { rejectWithValue }) => {
        try {
            // Axios GET request with credentials
            const response = await axios.get("http://localhost:8000/api/shop/products/get", {
                withCredentials: true,
            });
            return response.data; // Return response data on success
        } catch (error) {
            // Handle errors and return custom message using rejectWithValue
            return rejectWithValue(
                error.response?.data || "Failed to fetch products. Please try again."
            );
        }
    }
);

// Initial State
const initialState = {
    isLoading: false,
    productList: [],
    error: null, // Add an error state to track issues
};

// Redux Slice
const ShoppingProductSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {}, // No reducers for now
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null; // Clear previous errors
            })
            .addCase(fetchAllFilteredProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload?.data || []; // Safely access payload data
                state.error = null; // Clear any error
            })
            .addCase(fetchAllFilteredProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.productList = [];
                state.error = action.payload || "An unknown error occurred."; // Update error state
            });
    },
});

export default ShoppingProductSlice.reducer;
