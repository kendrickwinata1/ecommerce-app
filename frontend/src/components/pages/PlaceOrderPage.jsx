import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../features/Message";
import CheckoutSteps from "../features/CheckoutSteps";
import { createOrder } from "../../actions/orderActions";
import { resetOrder } from "../../slice/order-slice";
import { cartClearItems } from "../../slice/cart-slice";

function PlaceOrderPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cart = useSelector((state) => state.cart);
	const { cartItems, shippingAddress, paymentMethod } = cart;

	const orderCreate = useSelector((state) => state.order);
	const { loading, error, success, orderDetails } = orderCreate;

	console.log(success);
	console.log(orderDetails);

	const itemsPrice = cartItems
		.reduce((acc, item) => acc + item.price * item.qty, 0)
		.toFixed(2);
	const shippingPrice = (cart.itemsPrice > 100 ? 0 : 3).toFixed(2);

	const totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);

	useEffect(() => {
		if (success) {
			navigate(`/order/${orderDetails._id}`);
			dispatch(cartClearItems());
		}
	}, [orderDetails]);

	const placeOrder = () => {
		console.log("place order");
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress: shippingAddress,
				paymentMethod: paymentMethod,
				itemsPrice: itemsPrice,
				shippingPrice: shippingPrice,
				totalPrice: totalPrice,
			})
		);
	};

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>

							<p>
								<strong>Shipping: </strong>
								{`${shippingAddress.address}, ${shippingAddress.city} ${shippingAddress.postalCode}, ${shippingAddress.country}`}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message variant="info">Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={2}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>

												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>

												<Col md={4}>
													{item.qty} X ${item.price} = $
													{(item.qty * item.price).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Item Price (w/ GST):</Col>
									<Col>${itemsPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping:</Col>
									<Col>${shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total:</Col>
									<Col>${totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{/* <ListGroup.Item>
								{error && <Message variant="danger">{error}</Message>}
							</ListGroup.Item> */}

							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cart.cartItems === 0}
									onClick={placeOrder}>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default PlaceOrderPage;
