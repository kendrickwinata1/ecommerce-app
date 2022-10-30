import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// userAction.js
export const registerUser = createAsyncThunk(
	// action type string
	"user/register",
	// callback function
	async ({ name, email, password }, { rejectWithValue }) => {
		try {
			// configure header's Content-Type as JSON
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			// make request to backend
			const { data } = await axios.post(
				`/api/users/register/`,
				{ name, email, password },
				config
			);
			console.log(data);
			localStorage.setItem("userInfo", JSON.stringify(data));
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

export const userLogin = createAsyncThunk(
	"user/login",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			// configure header's Content-Type as JSON
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			console.log({ email, password });
			const { data } = await axios.post(
				`/api/users/login/`,
				{ username: email, password: password },
				config
			);
			console.log(data);
			// store user's token in local storage
			localStorage.setItem("userInfo", JSON.stringify(data));
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

export const getUserDetails = createAsyncThunk(
	"user/getUserDetails",
	async (arg, { getState, rejectWithValue }) => {
		try {
			// get user data from store
			const { user } = getState();
			console.log(user);
			console.log(user.userInfo.token);

			// configure authorization header with user's token
			const config = {
				headers: {
					Authorization: `Bearer ${user.userInfo.token}`,
				},
			};

			const { data } = await axios.get(`/api/users/profile/`, config);
			console.log({ data });

			return data;
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);

// take an object of user name email password and send that data to our url
export const updateUserProfile = createAsyncThunk(
	"user/updateUserDetail",
	async (userUpdateDetail, { getState, rejectWithValue }) => {
		try {
			// get user data from store
			const { user } = getState();
			console.log(userUpdateDetail);
			console.log(user);

			console.log(`Bearer ${user.userInfo.token}`);

			// configure authorization header with user's token
			const config = {
				headers: {
					Authorization: `Bearer ${user.userInfo.token}`,
				},
			};

			const { data } = await axios.put(
				`/api/users/profile/update/`,
				userUpdateDetail,
				config
			);
			console.log({ data });

			localStorage.setItem("userInfo", JSON.stringify(data));
			return data;

			return data;
		} catch (error) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
