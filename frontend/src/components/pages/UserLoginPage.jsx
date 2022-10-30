import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../actions/userActions";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../features/Loader";
import Message from "../features/Message";
import FormContainer from "../features/FormContainer";

const LoginPage = () => {
	const { loading, userInfo, error } = useSelector((state) => state.user);
	console.log(userInfo);

	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	// redirect authenticated user to profile screen
	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const submitForm = (data) => {
		console.log(data);
		dispatch(userLogin(data));
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}

			<Form onSubmit={handleSubmit(submitForm)}>
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

				<Button type="submit" className="button my-3" disabled={loading}>
					Login
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					New Customer? <Link to={`/register`}>Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};
export default LoginPage;
