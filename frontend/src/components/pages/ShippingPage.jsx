import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../features/FormContainer";
import { saveShippingAddress } from "../../slice/cart-slice";
import CheckoutSteps from "../features/CheckoutSteps";

function ShippingPage() {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [country, setCountry] = useState(shippingAddress.country);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submitForm = () => {
		console.log("submitted");
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		navigate("/payment");
	};
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={handleSubmit(submitForm)}>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter address"
						value={address ? address : ""}
						className="form-input"
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter city"
						value={city ? city : ""}
						className="form-input"
						onChange={(e) => setCity(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="postalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter postal code"
						value={postalCode ? postalCode : ""}
						className="form-input"
						onChange={(e) => setPostalCode(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter country"
						value={country ? country : ""}
						className="form-input"
						onChange={(e) => setCountry(e.target.value)}
						required
					/>
				</Form.Group>
				<Button type="submit" variant="primary" className="button my-3">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
}

export default ShippingPage;
