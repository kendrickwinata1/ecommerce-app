import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { getUserDetails } from "../../actions/userActions";
import { userLogout } from "../../slice/user-slice";
import { useNavigate } from "react-router-dom";
import Message from "../features/Message";
import Loader from "../features/Loader";
import { resetMyOrderState } from "../../slice/my-order-slice";
import { listMyOrder } from "../../actions/myOrderActions";
import SearchBox from "../features/SearchBox";

function Header() {
	const { userInfo, userToken, error, loading } = useSelector(
		(state) => state.user
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
							<LinkContainer to="/">
								<Navbar.Brand>Casper</Navbar.Brand>
							</LinkContainer>

							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<SearchBox />
								<Nav className="ml-auto">
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
