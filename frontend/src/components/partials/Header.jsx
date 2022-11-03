import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";
import { getUserDetails } from "../../actions/userActions";
import { userLogout } from "../../slice/user-slice";
import { useNavigate } from "react-router-dom";
import Message from "../features/Message";
import Loader from "../features/Loader";
import { resetMyOrderState } from "../../slice/my-order-slice";
import { listMyOrder } from "../../actions/myOrderActions";
import { resetProductState } from "../../slice/product-slice";
import { listProductsByCategory } from "../../actions/productActions";
import SearchBox from "../features/SearchBox";
import queryString from "query-string";

function Header() {
	const { userInfo, userToken, error, loading } = useSelector(
		(state) => state.user
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [category, setCategory] = useState("");

	// automatically authenticate user if token is found
	useEffect(() => {
		if (userToken) {
			dispatch(getUserDetails());
		}
	}, [userToken, dispatch]);

	const logoutHandler = () => {
		console.log("logout");
		window.location.reload(false);
		dispatch(userLogout());
	};

	const resetState = () => {
		dispatch(resetMyOrderState());
		dispatch(listMyOrder());
	};

	useEffect(() => {
		if (category) {
			navigate(`/?category=${category}`);
			window.location.reload();
		}
	}, [category]);

	const queryParams = queryString.parse(window.location.search);

	let categoryValue = "";

	if (queryParams.category) {
		categoryValue = `${queryParams.category}`;
		console.log(categoryValue);
	} else {
		categoryValue = "";
	}

	console.log(category);

	return (
		<header>
			{error ? (
				<>
					<Message variant="danger">{error}</Message>
				</>
			) : loading ? (
				<>
					<Loader />
				</>
			) : (
				<>
					<Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
						<Container>
							<LinkContainer
								to="/"
								onClick={() => (window.location.href = "/")}>
								<Navbar.Brand>Casper</Navbar.Brand>
							</LinkContainer>

							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<SearchBox />
							<Form.Select
								onChange={(e) => setCategory(e.target.value)}
								variant="success"
								aria-label="Default select example"
								style={{ width: "10vw", margin: "auto 0px", color: "grey" }}>
								<option>
									{categoryValue ? categoryValue : "Select Category"}
								</option>
								<option value="All">All</option>
								<option value="Air Fryer">Air Fryer</option>
								<option value="Air Purifier">Air Purifier</option>
								<option value="Armband">Armband</option>
								<option value="Assistant">Assistant</option>
								<option value="Camera">Camera</option>
								<option value="Case">Case</option>
								<option value="Drone">Drone</option>
								<option value="Earphone">Earphone</option>
								<option value="Electronics">Electronics</option>
								<option value="Hair">Hair</option>
								<option value="Headphone">Headphone</option>
								<option value="Keyboard">Keyboard</option>
								<option value="Laptop">Laptop</option>
								<option value="Microscope">Microscope</option>
								<option value="Mobile phone">Mobile phone</option>
								<option value="Mouse">Mouse</option>
								<option value="Projector">Projector</option>
								<option value="Speaker">Speaker</option>
							</Form.Select>
							<Navbar.Collapse
								id="basic-navbar-nav"
								className="justify-content-end">
								<Nav>
									<LinkContainer to="/cart">
										<Nav.Link>
											<i className="fas fa-shopping-cart"></i>Cart
										</Nav.Link>
									</LinkContainer>

									{userInfo ? (
										<NavDropdown title={userInfo.name} id="username">
											<LinkContainer to="/profile" onClick={resetState}>
												<NavDropdown.Item>Profile</NavDropdown.Item>
											</LinkContainer>

											<NavDropdown.Item onClick={logoutHandler}>
												Logout
											</NavDropdown.Item>
										</NavDropdown>
									) : (
										<LinkContainer to="/login">
											<Nav.Link>
												<i className="fas fa-user"></i>Login
											</Nav.Link>
										</LinkContainer>
									)}
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</>
			)}
		</header>
	);
}

export default Header;
