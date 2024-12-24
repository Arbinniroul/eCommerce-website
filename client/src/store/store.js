import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import adminProductSlice from './admin/productsslice/index';
import ShoppingProductSlice from './shop/productslice/index';
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        shopProducts:ShoppingProductSlice
    }
});

export default store;
