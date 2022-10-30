import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
	reducerPath: "productData",
	baseQuery: fetchBaseQuery({
		baseUrl: `https://caspershop.herokuapp.com`,
		// baseUrl: `https://localhost:8000`,
	}),
	endpoints: (builder) => ({
		getProductData: builder.query({
			query() {
				return `/api/products/`;
			},
		}),
	}),
});

// Action creators are generated for each case reducer function
export const { useGetProductDataQuery } = productApi;
