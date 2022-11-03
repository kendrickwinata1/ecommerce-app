import { createSlice } from "@reduxjs/toolkit";
import {
	createProductReview,
	listProductDetail,
	listTopProducts,
	listProducts,
} from "../actions/productActions";

const initialState = {
	createReview: {},
	topProducts: {},
	getProduct: {},
	products: {},
	pages: {},
	page: {},
	loading: true,
	error: null,
	success: false,
	loadingTopProduct: true,
	errorTopProduct: null,
	successTopProduct: false,
	reset: "",
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		resetProductState: (state) => {
			state.success = false;
			state.loading = true;
			state.error = null;
			state.products = {};
			state.page = {};
			state.pages = {};
		},
		resetProductReviewState: (state) => {
			state.success = false;
		},
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
		[listTopProducts.rejected]: (state, { payload }) => {
			state.loadingTopProduct = false;
			state.errorTopProduct = payload;
			state.successTopProduct = false;
		},
		[listTopProducts.pending]: (state) => {
			state.loadingTopProduct = true;
			state.errorTopProduct = null;
			state.successTopProduct = false;
		},
		[listTopProducts.fulfilled]: (state, { payload }) => {
			state.loadingTopProduct = false;
			state.successTopProduct = true;
			state.topProducts = payload;
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

export const { resetProductState, resetProductReviewState } =
	productSlice.actions;

export default productSlice.reducer;
