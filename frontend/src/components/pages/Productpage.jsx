import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Button,
	Card,
	Form,
} from "react-bootstrap";
import Loader from "../features/Loader";
import Rating from "../products/Rating";
import { useNavigate } from "react-router-dom";
import { useGetProductDetailQuery } from "../../slice/product-detail-api-slice";

function Productpage() {
	const [qty, setQty] = useState(1);

	const params = useParams();

	const productID = params.id;

	const navigate = useNavigate();

	const { data, error, isLoading } = useGetProductDetailQuery(productID);

	const addToCartHandler = () => {
		console.log(`Add to cart : ${productID}`);
		navigate(`/cart/${productID}?qty=${qty}`);
	};

	return (
		<div>
			{error ? (
				<>Oh no, there was an error</>
			) : isLoading ? (
				<>
					<Loader />
				</>
			) : data ? (
				<>
					<Link to="/" className="btn btn-light my-3">
						Go Back
					</Link>
					<Row>
						<Col md={6}>
							<Image src={data.image} alt={data.name} fluid />
						</Col>
						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{data.name}</h3>
								</ListGroup.Item>

								<ListGroup.Item>
									<Rating
										value={data.rating}
										text={`${data.numReviews} reviews`}
										color={"#f8e825"}
									/>
								</ListGroup.Item>

								<ListGroup.Item>Price: ${data.price}</ListGroup.Item>
								<ListGroup.Item>Description: {data.description}</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>${data.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{data.countInStock > 0 ? "In Stock" : "Out of Stock"}
											</Col>
										</Row>
									</ListGroup.Item>

									{data.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col xs="auto" className="my-1">
													<Form.Control
														as="select"
														value={qty}
														onChange={(e) => setQty(e.target.value)}>
														{[...Array(data.countInStock).keys()].map((x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														))}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
											className="btn-block"
											type="button"
											disabled={data.countInStock == 0}>
											Add to Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			) : null}
		</div>
	);
}

export default Productpage;
