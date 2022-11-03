import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../../actions/productActions";

function ProductCarousel() {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("triggered");
		dispatch(listTopProducts());
	}, []);

	const topProduct = useSelector((state) => state.product);
	console.log(topProduct);
	const { errorTopProduct, loadingTopProduct, topProducts } = topProduct;

	return loadingTopProduct ? (
		<Loader />
	) : errorTopProduct ? (
		<Message variant="danger">{errorTopProduct}</Message>
	) : (
		<Carousel pause="hover" className="bg-dark">
			{topProducts.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image
							src={product.image}
							alt={product.name}
							fluid
							style={{ objectFit: "contain" }}
						/>
						<Carousel.Caption className="carousel.caption">
							<h4>
								{product.name} (${product.price})
							</h4>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
}

export default ProductCarousel;
