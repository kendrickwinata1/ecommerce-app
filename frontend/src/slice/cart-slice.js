import { createSlice, current } from "@reduxjs/toolkit";
import { getCartData } from "../actions/cartActions";

// const currentItem =
// 	localStorage.getItem("currentItem") != null
// 		? JSON.parse(localStorage.getItem("currentItem"))
// 		: [];

// console.log(currentItem);

const cartItemsFromStorage =
	localStorage.getItem("cartItems") != null
		? JSON.parse(localStorage.getItem("cartItems"))
		: [];

const paymentMethodFromStorage =
	localStorage.getItem("paymentMethod") != null
		? JSON.parse(localStorage.getItem("paymentMethod"))
		: "";

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const initialState = {
	cartItems: cartItemsFromStorage,
	shippingAddress: shippingAddressFromStorage,
	paymentMethod: paymentMethodFromStorage,
	itemsPrice: "",
	shippingPrice: "",
	totalPrice: "",
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			console.log(item);
			const existItem = state.cartItems.find((x) => x.product === item.product);
			console.log(existItem);

			if (existItem) {
				existItem.qty = Number(existItem.qty) + Number(item.qty);
				if (existItem.qty > existItem.countInStock) {
					existItem.qty = Number(existItem.countInStock);
				}
			} else {
				state.cartItems.push(item);
			}

			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		updateCartQuantity: (state, action) => {
			const { productId, quantity } = action.payload;

			console.log(state.cartItems[0]);
			console.log(current(state));

			const updatedProduct = state.cartItems.find(
				(x) => x.product === productId
			);

			updatedProduct.qty = quantity;

			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		removeFromCart: (state, action) => {
			const productId = action.payload;
			state.cartItems = state.cartItems.filter((x) => x.product !== productId);
			console.log(current(state));

			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
			localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
		},
		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
			localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
		},
		cartClearItems: (state, action) => {
			localStorage.removeItem("cartItems");
			localStorage.removeItem("shippingAddress");
			localStorage.removeItem("paymentMethod");
			state.cartItems = [];
			state.shippingAddress = {};
			state.paymentMethod = "";
		},
	},
});

export const {
	addToCart,
	updateCartQuantity,
	removeFromCart,
	saveShippingAddress,
	savePaymentMethod,
	cartClearItems,
} = cartSlice.actions;

export default cartSlice.reducer;
