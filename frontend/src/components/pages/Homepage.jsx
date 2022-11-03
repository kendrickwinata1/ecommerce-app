import React from "react";
import { useState, useEffect } from "react";

import { Row, Col, Form } from "react-bootstrap";
import Product from "../products/Product";
import Loader from "../features/Loader";
import { useGetProductDataQuery } from "../../slice/product-api-slice";
import queryString from "query-string";
import { listProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { resetProductState } from "../../slice/product-slice";
import Paginate from "../features/Paginate";

function Homepage() {
	const dispatch = useDispatch();
	const queryParams = queryString.parse(window.location.search);
	const productsData = useSelector((state) => state.product);

	const { products, error, loading, page, pages } = productsData;

	let keyword = "";

	if (queryParams.keyword) {
		keyword = `keyword=${queryParams.keyword}`;
		console.log(keyword);
	} else {
		keyword = "";
	}

	let pageQuery = "";

	if (queryParams.page) {
		pageQuery = `page=${queryParams.page}`;
		console.log(page);
	} else {
		pageQuery = "";
	}

	let category = "";

	if (queryParams.category) {
		category = `category=${queryParams.category}`;
		console.log(category);
	} else {
		category = "";
	}

	useEffect(() => {
		dispatch(resetProductState());
		console.log("useEffect triggered");
		dispatch(listProducts({ keyword, pageQuery, category }));
	}, [keyword, dispatch, pageQuery, category]);

	console.log(products);

	return (
		<div>
			<h1>Latest Products (updated)</h1>

			{error ? (
				<>Oh no, there was an error</>
			) : loading ? (
				<>
					<Loader />
				</>
			) : products ? (
				<>
					<div>
						<Row>
							{products.map((product) => (
								<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
									<Product product={product} />
								</Col>
							))}
						</Row>
						<Paginate pages={pages} page={page} keyword={keyword} />
					</div>
				</>
			) : null}
		</div>
	);
}

export default Homepage;
