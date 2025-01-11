import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
    error: null,
};

// Fetch all products
export const fetchAllProduct = createAsyncThunk(
    "adminProducts/fetchAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`);
            return response.data; // Ensure this matches API response structure
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add a new product
export const addNewProduct = createAsyncThunk(
    "adminProducts/addNewProduct",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`, formData, {
                headers: { "Content-type": "application/json" },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Edit a product
export const editProduct = createAsyncThunk(
    "adminProducts/editProduct",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
                formData,
                { headers: { "Content-type": "application/json" } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
    "adminProducts/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,
                { headers: { "Content-type": "application/json" } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All Products
            .addCase(fetchAllProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload?.products || [];
            })
            .addCase(fetchAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to fetch products.";
            })

            // Add New Product
            .addCase(addNewProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList.push(action.payload); // Add the new product to the list
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to add product.";
            })

            // Edit Product
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.productList.findIndex((p) => p._id === action.payload?._id);
                if (index !== -1) {
                    state.productList[index] = action.payload; // Update product
                }
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to edit product.";
            })

            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = state.productList.filter((p) => p._id !== action.payload?._id);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to delete product.";
            });
    },
});

export default AdminProductsSlice.reducer;
