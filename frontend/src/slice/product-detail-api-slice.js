import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productDetailApi = createApi({
	reducerPath: "productDetail",
	baseQuery: fetchBaseQuery({
		baseUrl: `https://caspershop.herokuapp.com`,
		// baseUrl: `https://localhost:8000`,
	}),
	endpoints: (builder) => ({
		getProductDetail: builder.query({
			query(id) {
				return `/api/products/${id}`;
			},
		}),
	}),
});

// Action creators are generated for each case reducer function
export const { useGetProductDetailQuery } = productDetailApi;
