import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, keyword = "" }) {
	if (keyword) {
		keyword = keyword.split("=")[1];
		console.log(keyword);
	}

	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((x) => (
					<Pagination.Item
						onClick={() =>
							(window.location.href = `/?keyword=${keyword}&page=${x + 1}`)
						}
						key={x + 1}
						active={x + 1 === page}>
						{x + 1}
					</Pagination.Item>
				))}
			</Pagination>
		)
	);
}

export default Paginate;
