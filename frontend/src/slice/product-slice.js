import { createSlice } from "@reduxjs/toolkit";
import {
	createProductReview,
	listProductDetail,
	listProducts,
} from "../actions/productActions";

const initialState = {
	createReview: {},
	getProduct: {},
	products: {},
	pages: {},
	page: {},
	loading: true,
	error: null,
	success: false,
	reset: "",
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		resetProductState: () => initialState,
	},
	extraReducers: {
		[listProducts.pending]: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		[listProducts.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.products = payload.products;
			state.page = payload.page;
			state.pages = payload.pages;
		},
		[listProducts.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.success = false;
		},
		[createProductReview.pending]: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		[createProductReview.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.createReview = payload;
		},
		[createProductReview.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.success = false;
		},
	},
});

export const { resetProductState } = productSlice.actions;

export default productSlice.reducer;
