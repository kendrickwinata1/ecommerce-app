import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrderDetail } from "../actions/orderActions";

// const orderDetailsFromStorage = localStorage.getItem("orderDetails")
// 	? JSON.parse(localStorage.getItem("orderDetails"))
// 	: {};

const initialState = {
	orderDetails: "",
	loading: true,
	error: null,
	success: false,
	reset: "",
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		resetOrderState: () => initialState,
	},
	extraReducers: {
		[createOrder.pending]: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		[createOrder.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.orderDetails = payload;
			localStorage.setItem("orderDetails", JSON.stringify(payload));
		},
		[createOrder.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.success = false;
		},
		[getOrderDetail.pending]: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		[getOrderDetail.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.orderDetails = payload;
		},
		[getOrderDetail.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.success = false;
		},
	},
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
