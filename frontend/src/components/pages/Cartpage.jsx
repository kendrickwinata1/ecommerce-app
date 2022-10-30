import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	addToCart,
	updateCartQuantity,
	removeFromCart,
} from "../../slice/cart-slice";
import queryString from "query-string";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import { useGetProductDetailQuery } from "../../slice/product-detail-api-slice";

function Cartpage() {
	const params = useParams();
	const productId = params.id;
	const queryParams = queryString.parse(window.location.search);
	const qty = Number(queryParams.qty);

	const cart = useSelector((state) => state.cart.cartItems);
	console.log(cart);

	const dispatch = useDispatch();

	//only for add to cart
	const { data, error, isLoading } = useGetProductDetailQuery(productId);

	useEffect(() => {
		if (data) {
			const cartData = {
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty,
			};
			dispatch(addToCart(cartData));
		}
	}, [data]);

	const navigate = useNavigate();

	const checkoutHandler = () => {
		navigate("/shipping");
	};

	return (
		// <div>cart</div>
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cart.length === 0 ? (
					<div>
						Your cart is empty <Link to="/">Go Back</Link>
					</div>
				) : (
					<ListGroup variant="flush">
						{cart.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>

									<Col md={2}>
										<Row>${item.price}</Row>
										<Row style={{ fontSize: "0.8rem" }}>
											{item.countInStock} left in stock
										</Row>
									</Col>

									<Col md={3}>
										<Form.Control
											as="select"
											value={item.qty}
											onChange={(e) =>
												dispatch(
													updateCartQuantity({
														productId: item.product,
														quantity: Number(e.target.value),
													})
												)
											}>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>

									<Col md={1}>
										<Button
											type="button"
											variant="light"
											onClick={() => dispatch(removeFromCart(item.product))}>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>

			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>
								Subtotal (
								{cart.reduce((accumulator, item) => accumulator + item.qty, 0)})
								items
							</h2>
							$
							{cart
								.reduce(
									(accumulator, item) => accumulator + item.qty * item.price,
									0
								)
								.toFixed(2)}
						</ListGroup.Item>
					</ListGroup>

					<ListGroup.Item>
						<Button
							type="button"
							className="btn-block"
							disabled={cart.length === 0}
							onClick={checkoutHandler}>
							Proceed To Checkout
						</Button>
					</ListGroup.Item>
				</Card>
			</Col>
		</Row>
	);
}

export default Cartpage;
