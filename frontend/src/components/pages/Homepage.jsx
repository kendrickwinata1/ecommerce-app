import React from "react";
import { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import Product from "../products/Product";
import Loader from "../features/Loader";
import { useGetProductDataQuery } from "../../slice/product-api-slice";
import queryString from "query-string";

function Homepage() {
	const queryParams = queryString.parse(window.location.search);

	let keyword = "";

	if (queryParams.keyword) {
		keyword = `?keyword=${queryParams.keyword}`;
		console.log(keyword);
	} else {
		keyword = "";
	}

	useEffect(() => {
		// window.location.reload();
	}, [queryParams.keyword]);

	const { data, error, isLoading } = useGetProductDataQuery(keyword);

	console.log(data);

	return (
		<div>
			<h1>Latest Products (updated)</h1>

			{error ? (
				<>Oh no, there was an error</>
			) : isLoading ? (
				<>
					<Loader />
				</>
			) : data ? (
				<>
					<div>
						<Row>
							{data.map((product) => (
								<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
									<Product product={product} />
								</Col>
							))}
						</Row>
					</div>
				</>
			) : null}
		</div>
	);
}

export default Homepage;
