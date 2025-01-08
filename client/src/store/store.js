import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import adminProductSlice from './admin/productsslice/index';
import ShoppingProductSlice from './shop/productslice/index';
import ShopCartSlice from './shop/cartslice/index';
import addressSlice from './shop/addressslice/index';
import shopOrderSlice from './shop/orderslice/index';
import adminOrderSlice from './admin/orderSlice/index';

const store = configureStore({
    reducer: {
        auth:authReducer,
        adminProducts: adminProductSlice,
        adminOrder:adminOrderSlice,
        shopProducts:ShoppingProductSlice,
        cart: ShopCartSlice,
        shopAddress:addressSlice,
        shopOrder: shopOrderSlice,
    }
});

export default store;
