import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productDetailApi = createApi({
	reducerPath: "productDetail",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_BASE_BACKEND_URL}`,
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
