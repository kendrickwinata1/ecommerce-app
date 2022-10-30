import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../features/Loader";
import FormContainer from "../features/FormContainer";
import { registerUser, userLogin } from "../../actions/userActions";
import Message from "../features/Message";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { listMyOrder } from "../../actions/myOrderActions";
// import { resetOrderState } from "../../slice/order-slice";
// import { getOrderDetail } from "../../actions/orderActions";

function ProfilePage() {
	const { loading, userInfo, error, success, userUpdateProfile } = useSelector(
		(state) => state.user
	);

	const myOrder = useSelector((state) => state.myOrder);
	console.log(myOrder.loading);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	const navigate = useNavigate();

	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		} else {
			setName(userInfo.name);
			console.log("setname");
			setEmail(userInfo.email);
			console.log("setemail");
		}
	}, [userInfo]);

	useEffect(() => {
		console.log("listOrder");
		dispatch(listMyOrder());
	}, []);

	// const refreshPage = () => {
	// 	window.location.reload(false);
	// };

	const submitForm = () => {
		console.log(password);
		console.log(confirmPassword);
		if (password !== confirmPassword) {
			setMessage("Password mismatch");
			return;
		} else {
			dispatch(
				updateUserProfile({
					id: userInfo._id,
					name: name,
					email: email,
					password: password,
				})
			);
			setMessage("");
		}
	};

	// const resetState = () => {
	// 	console.log("reset state");
	// 	dispatch(resetOrderState());
	// 	dispatch(getOrderDetail(orderId));
	// };

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{loading && <Loader />}

				<Form onSubmit={handleSubmit(submitForm)}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Name"
							value={name}
							className="form-input"
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter Email"
							value={email}
							className="form-input"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter Password"
							value={password}
							className="form-input"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							value={setPassword}
							className="form-input"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>
					<Button type="submit" className="button my-3" disabled={loading}>
						Update
					</Button>
				</Form>
			</Col>

			<Col md={9}>
				<h2>My Orders</h2>
				{myOrder.loading ? (
					<Loader />
				) : myOrder.error ? (
					<Message variant="danger">{myOrder.error}</Message>
				) : (
					<Table striped responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>Date</th>
								<th>Total</th>
								<th>Paid</th>
								<th>Delivered</th>
							</tr>
						</thead>
						<tbody>
							{myOrder.myOrderList.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt ? order.createdAt.slice(0, 10) : ""}</td>
									<td>${order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										<Button href={`/order/${order._id}`} className="btn-sm">
											Details
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
}

export default ProfilePage;
