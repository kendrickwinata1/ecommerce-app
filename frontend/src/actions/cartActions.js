import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../slice/cart-slice";
import axios from "axios";

export const getCartData = createAsyncThunk(
	"cart",
	async ({ productId, qty }, { rejectWithValue }) => {
		try {
			// const dispatch = useDispatch();
			console.log(productId);
			console.log(qty);
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const requestApi = await axios.get(`/api/products/${productId}/`);

			console.log(requestApi.data._id);
			const data = {
				product: requestApi.data._id,
				name: requestApi.data.name,
				image: requestApi.data.image,
				price: requestApi.data.price,
				countInStock: requestApi.data.countInStock,
				qty,
			};
			console.log(data);

			localStorage.setItem("currentItem", JSON.stringify(data));
			// dispatch(addToCart(data));

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

// export const getUserDetails = createAsyncThunk(
// 	"user/getUserDetails",
// 	async (arg, { getState, rejectWithValue }) => {
// 		try {
// 			// get user data from store
// 			const { user } = getState();
// 			console.log({ user });

// 			// configure authorization header with user's token
// 			const config = {
// 				headers: {
// 					Authorization: `Bearer ${user.userToken}`,
// 				},
// 			};
// 			console.log({ data });
// 			const { data } = await axios.get(`/api/users/profile/`, config);

// 			return data;
// 		} catch (error) {
// 			if (error.response && error.response.data.message) {
// 				return rejectWithValue(error.response.data.message);
// 			} else {
// 				return rejectWithValue(error.message);
// 			}
// 		}
// 	}
// );

// const { data, error, isLoading } = useGetProductDetailQuery(productId);

// 	useEffect(() => {
// 		const cartData = {
// 			product: data._id,
// 			name: data.name,
// 			image: data.image,
// 			price: data.price,
// 			countInStock: data.countInStock,
// 			qty,
// 		};

// 		dispatch(addToCart(cartData));
// 	}, [data]);

// export const userLogin = createAsyncThunk(
// 	"user/login",
// 	async ({ username, password }, { rejectWithValue }) => {
// 		try {
// 			// configure header's Content-Type as JSON
// 			const config = {
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 			};
// 			console.log({ username, password });
// 			const { data } = await axios.post(
// 				`/api/users/login/`,
// 				{ username, password },
// 				config
// 			);

// 			// store user's token in local storage
// 			localStorage.setItem("userInfo", JSON.stringify(data));
// 			return data;
// 		} catch (error) {
// 			// return custom error message from API if any
// 			if (error.response && error.response.data.message) {
// 				return rejectWithValue(error.response.data.message);
// 			} else {
// 				return rejectWithValue(error.message);
// 			}
// 		}
// 	}
// );
