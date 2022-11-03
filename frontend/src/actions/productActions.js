import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listProducts = createAsyncThunk(
	"product/listProduct",
	async ({ keyword, pageQuery, category }, { getState, rejectWithValue }) => {
		try {
			// make request to backend
			console.log(keyword);
			console.log(pageQuery);

			if (keyword && pageQuery) {
				const { data } = await axios.get(
					`/api/products/?${keyword}&${pageQuery}`
				);
				return data;
			} else if (keyword && !pageQuery) {
				const { data } = await axios.get(`/api/products/?${keyword}`);
				return data;
			} else if (!keyword && pageQuery) {
				const { data } = await axios.get(`/api/products/?${pageQuery}`);
				return data;
			} else if (category) {
				const { data } = await axios.get(`/api/products/?${category}`);
				return data;
			} else {
				const { data } = await axios.get(`/api/products/`);
				return data;
			}
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

export const listProductsByCategory = createAsyncThunk(
	"product/listProductByCategory",
	async ({ category }, { getState, rejectWithValue }) => {
		try {
			// make request to backend

			const { data } = await axios.get(`/api/products/?${category}`);
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

export const listTopProducts = createAsyncThunk(
	"products/listTopProduct",
	async (arg, { getState, rejectWithValue }) => {
		try {
			// make request to backend
			console.log("top product triggered");
			const { data } = await axios.get(`/api/products/top/`);
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

export const listProductDetail = createAsyncThunk(
	"review/createReview",
	async (productID, { getState, rejectWithValue }) => {
		try {
			// make request to backend
			const { data } = await axios.get(`/api/products/${productID}/`);
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
