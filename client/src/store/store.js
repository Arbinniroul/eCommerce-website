import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import adminProductSlice from './admin/productsslice/index';
import ShoppingProductSlice from './shop/productslice/index';
import ShopCartSlice from './shop/cartslice/index';
import addressSlice from './shop/addressslice/index';
import shopOrderSlice from './shop/orderslice/index';
import adminOrderSlice from './admin/orderSlice/index';
import searchSlice from './shop/searchSlice/index';
import shopReviewSlice from "./shop/reviewSlice/index";
import commonFeatureSlice from "./common-slice";
const store = configureStore({
    reducer: {
        auth:authReducer,
        adminProducts: adminProductSlice,
        adminOrder:adminOrderSlice,
        shopProducts:ShoppingProductSlice,
        cart:ShopCartSlice,
        shopAddress:addressSlice,
        shopOrder:shopOrderSlice,
        shopSearch:searchSlice,
        shopReview:shopReviewSlice,
        commonFeature: commonFeatureSlice,
    }
});

export default store;
