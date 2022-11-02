import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

function SearchBox() {
	const [keyword, setKeyword] = useState("");

	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword) {
			navigate(`/?keyword=${keyword}`);
			window.location.reload();
		} else {
			navigate(`/`);
			window.location.reload();
		}
	};

	return (
		<Form onSubmit={submitHandler} className="d-flex">
			<Row>
				<Col>
					<Form.Control
						type="search"
						name="q"
						onChange={(e) => setKeyword(e.target.value)}
						className="mr-sm-2 ml-sm-5"></Form.Control>
				</Col>
				<Col>
					<Button type="submit" variant="outline-success" className="p-2">
						Search
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

export default SearchBox;
