import { createSlice } from "@reduxjs/toolkit";
import { listMyOrder } from "../actions/myOrderActions";

// const orderDetailsFromStorage = localStorage.getItem("orderDetails")
// 	? JSON.parse(localStorage.getItem("orderDetails"))
// 	: {};

const initialState = {
	myOrderList: "",
	loading: true,
	error: null,
	success: false,
};

const myOrderSlice = createSlice({
	name: "myOrder",
	initialState,
	reducers: {
		resetMyOrderState: () => initialState,
	},
	extraReducers: {
		[listMyOrder.pending]: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		[listMyOrder.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true;
			state.myOrderList = payload;
		},
		[listMyOrder.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.success = false;
		},
	},
});

export const { resetMyOrderState } = myOrderSlice.actions;

export default myOrderSlice.reducer;
