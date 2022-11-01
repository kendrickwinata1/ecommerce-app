import { createSlice } from "@reduxjs/toolkit";
import {
	createProductReview,
	listProductDetail,
} from "../actions/reviewActions";

const initialState = {
	createReview: {},
	getProduct: {},
	loading: true,
	error: null,
	success: false,
	reset: "",
};

const reviewSlice = createSlice({
	name: "review",
	initialState,
	reducers: {
		resetReviewState: () => initialState,
	},
	extraReducers: {
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

export const { resetReviewState } = reviewSlice.actions;

export default reviewSlice.reducer;
