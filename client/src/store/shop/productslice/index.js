import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk for Fetching Products
export const fetchAllFilteredProduct = createAsyncThunk(
    "products/fetchAllFilteredProducts", // Updated name for better consistency
    async ({filterParams,sortParams},{rejectWithValue}) => {
        const query=new URLSearchParams({
            ...filterParams,
            sortBy:sortParams,
     })
        try {
            // Axios GET request with credentials
            const response = await axios.get(`http://localhost:8000/api/shop/products/get?${query}`, {
                withCredentials: true,
            });
            return response.data; // Return response data on success
        } catch (error) {
            console.log(error, "Error happened");
            return rejectWithValue(error.response?.data?.message || "An unknown error occurred.");
        }
        
    }
);
export const getProductDetails = createAsyncThunk(
    "products/getProductDetails", // Updated name for better consistency
    async (id,{rejectWithValue}) => {
        try {
            // Axios GET request with credentials
            const result = await axios.get(`http://localhost:8000/api/shop/products/get/${id}`, {
                withCredentials: true,
            });
            
            return result?.data; // Return response data on success
        } catch (error) {
            console.log(error, "Error happened");
            return rejectWithValue(error.response?.data?.message || "An unknown error occurred.");
        }
        
    }
);

// Initial State
const initialState = {
    isLoading: false,
    productList: [],
    productDetails:[],
    error: null, // Add an error state to track issues
};

// Redux Slice
const ShoppingProductSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
        setProductDetails:(state)=>{
            state.productDetails=null;

        }
    }, // No reducers for now
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
            })
            .addCase(getProductDetails.pending, (state) => {
                state.isLoading = true;
            
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload?.data || []; // Safely access payload data
                state.error = null; // Clear any error
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.productDetails = [];
                state.error = action.payload || "An unknown error occurred."; // Update error state
            });
    },
});
export const {setProductDetails}=ShoppingProductSlice.actions;
export default ShoppingProductSlice.reducer;
