import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
	// action type string
	"order/createOrder",
	// callback function
	async (order, { getState, rejectWithValue }) => {
		try {
			const { user } = getState();
			console.log(user);

			console.log(`Bearer ${user.userInfo.token}`);

			// configure header's Content-Type as JSON
			const config = {
				headers: {
					Authorization: `Bearer ${user.userInfo.token}`,
				},
			};
			console.log(order);
			// make request to backend
			const { data } = await axios.post(`/api/orders/add/`, order, config);
			console.log(data);

			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const getOrderDetail = createAsyncThunk(
	// action type string
	"order/createOrder",
	// callback function
	async (orderId, { getState, rejectWithValue }) => {
		try {
			const { user } = getState();
			console.log(user);

			console.log(`Bearer ${user.userInfo.token}`);

			// configure header's Content-Type as JSON
			const config = {
				headers: {
					Authorization: `Bearer ${user.userInfo.token}`,
				},
			};
			console.log(orderId);
			// make request to backend
			const { data } = await axios.get(`/api/orders/${orderId}/`, config);
			console.log(data);

			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

export const payOrderAction = createAsyncThunk(
	// action type string
	"order/createOrder",
	// callback function
	async ({ orderId, paymentResult }, { getState, rejectWithValue }) => {
		try {
			console.log(orderId);

			const { user } = getState();
			console.log(user);

			console.log(`Bearer ${user.userInfo.token}`);

			// configure header's Content-Type as JSON
			const config = {
				headers: {
					Authorization: `Bearer ${user.userInfo.token}`,
				},
			};
			console.log(orderId);
			// make request to backend
			const { data } = await axios.put(
				`/api/orders/${orderId}/pay/`,
				paymentResult,
				config
			);
			console.log(data);

			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
