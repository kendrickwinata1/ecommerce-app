import { createSlice } from "@reduxjs/toolkit";
import { payOrderAction } from "../actions/orderActions";

// const orderDetailsFromStorage = localStorage.getItem("orderDetails")
// 	? JSON.parse(localStorage.getItem("orderDetails"))
// 	: {};

const initialState = {
	orderPay: {},
	loadingPay: false,
	errorPay: null,
	successPay: false,
	reset: "",
};

const orderPaySlice = createSlice({
	name: "orderPay",
	initialState,
	reducers: {
		resetPayOrderState: () => initialState,
	},
	extraReducers: {
		[payOrderAction.pending]: (state) => {
			state.loadingPay = true;
			state.errorPay = null;
			state.successPay = false;
		},
		[payOrderAction.fulfilled]: (state) => {
			state.loadingPay = false;
			state.successPay = true;
		},
		[payOrderAction.rejected]: (state, { payload }) => {
			state.loadingPay = false;
			state.errorPay = payload;
			state.successPay = false;
		},
	},
});

export const { resetPayOrderState } = orderPaySlice.actions;

export default orderPaySlice.reducer;
