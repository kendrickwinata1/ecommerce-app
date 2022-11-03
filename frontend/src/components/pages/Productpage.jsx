import React, { useEffect } from "react";
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
import Message from "../features/Message";
import Rating from "../products/Rating";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductDetailQuery } from "../../slice/product-detail-api-slice";
import {
	createProductReview,
	listProductDetail,
} from "../../actions/productActions";
import { resetProductReviewState } from "../../slice/product-slice";

function Productpage() {
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const userInfo = useSelector((state) => state.user.userInfo);

	const reviewDetail = useSelector((state) => state.product);
	const {
		loading: loadingProductReview,
		error: errorProductReview,
		success: successProductReview,
		createReview,
	} = reviewDetail;

	const productID = params.id;

	useEffect(() => {
		dispatch(resetProductReviewState());
	}, []);

	useEffect(() => {
		if (successProductReview) {
			console.log("review success");
			setRating(0);
			setComment("");
		}
	}, [successProductReview]);

	const { data, error, isLoading } = useGetProductDetailQuery(productID);

	const addToCartHandler = () => {
		console.log(`Add to cart : ${productID}`);
		navigate(`/cart/${productID}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		const review = {
			rating,
			comment,
		};

		dispatch(createProductReview({ productID, review }));
	};

	return (
		<div>
			<Link to="/" className="btn btn-light my-3">
				Go Back
			</Link>
			{error ? (
				<Message variant="danger">{error}</Message>
			) : isLoading ? (
				<>
					<Loader />
				</>
			) : data ? (
				<>
					<div>
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
									<ListGroup.Item>
										Description: {data.description}
									</ListGroup.Item>
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

						<Row>
							<Col md={6}>
								<h4>Reviews</h4>
								{data.reviews.length === 0 && (
									<Message variant="info">No Reviews</Message>
								)}

								<ListGroup variant="flush">
									{data.reviews.map((review) => (
										<ListGroup.Item key={review._id}>
											<strong>{review.name}</strong>
											<Rating value={review.rating} color="#f8e825" />
											<p>{review.createdAt.substring(0, 10)}</p>
											<p>{review.comment}</p>
										</ListGroup.Item>
									))}

									<ListGroup.Item>
										<h4>Write a review</h4>

										{successProductReview && (
											<Message variant="success">Review Submitted</Message>
										)}

										{errorProductReview && (
											<Message variant="danger">{errorProductReview}</Message>
										)}

										{userInfo ? (
											<Form onSubmit={submitHandler}>
												<Form.Group controlId="rating">
													<Form.Label>Rating</Form.Label>

													<Form.Control
														as="select"
														value={rating}
														onChange={(e) => setRating(e.target.value)}>
														<option value="">Select...</option>
														<option value="1">1 - Poor</option>
														<option value="2">2 - Fair</option>
														<option value="3">3 - Good</option>
														<option value="4">4 - Very Good</option>
														<option value="5">5 - Excellent</option>
													</Form.Control>
												</Form.Group>

												<Form.Group controlId="comment" className="my-3">
													<Form.Label>Review</Form.Label>
													<Form.Control
														as="textarea"
														row="5"
														value={comment}
														onChange={(e) =>
															setComment(e.target.value)
														}></Form.Control>
												</Form.Group>

												<Button
													disabled={successProductReview}
													type="submit"
													variant="primary">
													Submit
												</Button>
											</Form>
										) : (
											<Message variant="info">
												Please <Link to="/login">login</Link> to write a review
											</Message>
										)}
									</ListGroup.Item>
								</ListGroup>
							</Col>
						</Row>
					</div>
				</>
			) : null}
		</div>
	);
}

export default Productpage;
