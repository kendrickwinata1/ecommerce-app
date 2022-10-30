import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
	reducerPath: "userData",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_BASE_BACKEND_URL}`,
	}),
	endpoints: (builder) => ({
		getUserData: builder.query({
			query() {
				return `/api/products/`;
			},
		}),
	}),
});

// Action creators are generated for each case reducer function
export const { useGetUserDataQuery } = userApi;
