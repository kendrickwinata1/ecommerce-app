import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../features/Message";
import Loader from "../features/Loader";
import { getOrderDetail, payOrderAction } from "../../actions/orderActions";
import { resetOrderState } from "../../slice/order-slice";
import { PayPalButton } from "react-paypal-button-v2";

function OrderPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();

	const [sdkReady, setSdkReady] = useState(false);

	const orderId = params.id;
	console.log(orderId);

	const order = useSelector((state) => state.order);

	// useEffect(() => {
	// 	console.log("reset");
	// 	dispatch(resetOrderState());
	// }, []);

	const { loading, error, success, orderDetails } = order;
	let itemsPrice = "";
	console.log(success);
	console.log(loading);

	const payOrder = useSelector((state) => state.orderPay);
	const { loadingPay, errorPay, successPay, orderPay } = payOrder;

	//AUlUfs_D9dwoglEz9x8w4jkA55qYvBw7seRE4_4Mu0oFHbLKjiYKfjmwgVN5AiS0irXNwzpI5hiLdwa-
	const addPayPalScript = () => {
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src =
			"https://www.paypal.com/sdk/js?client-id=AUlUfs_D9dwoglEz9x8w4jkA55qYvBw7seRE4_4Mu0oFHbLKjiYKfjmwgVN5AiS0irXNwzpI5hiLdwa-";
		script.async = true;
		script.onload = () => {
			setSdkReady(true);
		};
		document.body.appendChild(script);
	};

	const successPaymentHandler = (paymentResult) => {
		console.log("payment success");
		console.log(orderId);
		dispatch(payOrderAction({ orderId, paymentResult }));
		window.location.reload(false);
	};

	useEffect(() => {
		console.log("getOrderDetail");
		if (!orderDetails || orderDetails._id !== Number(orderId)) {
			dispatch(resetOrderState());
			dispatch(getOrderDetail(orderId));
		} else if (!orderDetails.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [orderId, dispatch, orderDetails, success, loading]);

	if (orderDetails._id === Number(orderId)) {
		itemsPrice = orderDetails.orderItems
			.reduce((acc, item) => acc + item.price * item.qty, 0)
			.toFixed(2);
	}

	const reset = () => {
		console.log("reset");
		navigate("/");
		dispatch(resetOrderState());
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<div>
			<h1>Order: {orderDetails._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>

							<p>
								<strong>Name: </strong>
								{orderDetails.user.name}
							</p>
							<p>
								<strong>Email: </strong>
								<a href={`mailto:${orderDetails.user.email}`} target="_newtab">
									{orderDetails.user.email}
								</a>
							</p>
							<p>
								<strong>Shipping: </strong>
								{`${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city} ${orderDetails.shippingAddress.postalCode}, ${orderDetails.shippingAddress.country}`}
							</p>
							{orderDetails.isDelivered ? (
								<Message variant="success">
									Delivered on {orderDetails.deliveredAt}
								</Message>
							) : (
								<Message variant="warning">Not Delivered</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>

							<p>
								<strong>Method: </strong>
								{orderDetails.paymentMethod}
							</p>
							{orderDetails.isPaid ? (
								<Message variant="success">
									Paid on {orderDetails.paidAt}
								</Message>
							) : (
								<Message variant="warning">Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{orderDetails.orderItems.length === 0 ? (
								<Message variant="info">Order is empty</Message>
							) : (
								<ListGroup variant="flush">
									{orderDetails.orderItems.map((item, index) => (
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
									<Col>${orderDetails.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total:</Col>
									<Col>${orderDetails.totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{!orderDetails.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}

									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={orderDetails.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}
							<ListGroup.Item>
								<Button onClick={reset} type="button" className="btn-block">
									Back to home
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default OrderPage;
