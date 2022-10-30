import React from "react";
import { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import Product from "../products/Product";
import Loader from "../features/Loader";
import { useGetProductDataQuery } from "../../slice/product-api-slice";

function Homepage() {
	const { data, error, isLoading } = useGetProductDataQuery();

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
