import { configureStore } from "@reduxjs/toolkit"; //wrapper, automatically add thunk etc
import { setupListeners } from "@reduxjs/toolkit/query";

import { productApi } from "../slice/product-api-slice";
import { productDetailApi } from "../slice/product-detail-api-slice";
import { userApi } from "../slice/user-api-slice";
import cartReducer from "../slice/cart-slice";
import userReducer from "../slice/user-slice";
import orderReducer from "../slice/order-slice";
import myOrderReducer from "../slice/my-order-slice";
import orderPayReducer from "../slice/order-pay-slice";
import productReducer from "../slice/product-slice";

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		[productApi.reducerPath]: productApi.reducer,
		[productDetailApi.reducerPath]: productDetailApi.reducer,
		user: userReducer,
		order: orderReducer,
		myOrder: myOrderReducer,
		orderPay: orderPayReducer,
		product: productReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			productApi.middleware,
			productDetailApi.middleware,
			userApi.middleware
		),
});

setupListeners(store.dispatch);
