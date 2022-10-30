import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listMyOrder = createAsyncThunk(
	// action type string
	"order/createOrder",
	// callback function
	async (arg, { getState, rejectWithValue }) => {
		try {
			const { user } = getState();
			console.log(user.userInfo.token);

			console.log(`Bearer ${user.userInfo.token}`);

			// configure header's Content-Type as JSON
			const config = {
				headers: {
					Authorization: `Bearer ${user.userInfo.token}`,
				},
			};

			// make request to backend
			const { data } = await axios.get(`/api/orders/myorders/`, config);
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
