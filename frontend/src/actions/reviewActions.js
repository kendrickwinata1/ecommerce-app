import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listProductDetail = createAsyncThunk(
	"review/createReview",
	async (productID, { getState, rejectWithValue }) => {
		try {
			// make request to backend
			const { data } = await axios.get(`/api/products/${productID}`);
			console.log(data);

			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				console.log("error line 31");
				return rejectWithValue(error.response.data.message);
			} else {
				console.log("error line 32");
				return rejectWithValue(error.message);
			}
		}
	}
);

export const createProductReview = createAsyncThunk(
	"review/createReview",
	async ({ productID, review }, { getState, rejectWithValue }) => {
		try {
			const { user } = getState();

			console.log(productID);
			console.log(review);

			// configure header's Content-Type as JSON
			const config = {
				headers: {
					Authorization: `Bearer ${user.userInfo.token}`,
				},
			};

			// make request to backend
			const { data } = await axios.post(
				`/api/products/${productID}/reviews/`,
				review,
				config
			);
			console.log(data);

			return data;
		} catch (error) {
			// return custom error message from API if any
			if (error.response && error.response.data.details) {
				return rejectWithValue(error.response.data.details);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
