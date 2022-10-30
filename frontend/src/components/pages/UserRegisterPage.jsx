import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../features/Loader";
import FormContainer from "../features/FormContainer";
import { registerUser, userLogin } from "../../actions/userActions";
import Message from "../features/Message";

const RegisterPage = () => {
	const { loading, userInfo, error, success } = useSelector(
		(state) => state.user
	);
	const dispatch = useDispatch();
	const [message, setMessage] = useState("");
	const { register, handleSubmit } = useForm();

	const navigate = useNavigate();

	useEffect(() => {
		// redirect user to login page if registration was successful
		if (success) navigate("/login");
		// redirect authenticated user to profile screen
		if (userInfo) navigate("/");
	}, [navigate, userInfo, success]);

	const submitForm = (data) => {
		// check if passwords match
		if (data.password !== data.confirmPassword) {
			setMessage("Password mismatch");
			return;
		}
		// transform email string to lowercase to avoid case sensitivity issues during login
		data.email = data.email.toLowerCase();
		dispatch(registerUser(data));
	};
	return (
		<FormContainer>
			<h1>Register</h1>
			{message && <Message variant="danger">{message}</Message>}
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}

			<Form onSubmit={handleSubmit(submitForm)}>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						className="form-input"
						{...register("name")}
						required
					/>
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						className="form-input"
						{...register("email")}
						required
					/>
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						className="form-input"
						{...register("password")}
						required
					/>
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						className="form-input"
						{...register("confirmPassword")}
						required
					/>
				</Form.Group>
				<Button type="submit" className="button my-3" disabled={loading}>
					Register
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Have an Account? <Link to={`/login`}>Sign In</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};
export default RegisterPage;
