import React from "react";
import { Link } from "react-router-dom";

const Card = ({ creator, onDelete }) => {
	if (!creator) return;

	return (
		<>
			<div className="card">
				<img src={creator.imageURL} alt={creator.name} />
				<h2>{creator.name}</h2>
				<p>{creator.description}</p>
				<a href={creator.url} target="_blank" rel="noopener noreferrer">
					Visit
				</a>
				<div className="card-actions">
					<Link to={`/view/${creator.id}`}>View</Link>
					<Link to={`/edit/${creator.id}`}>Edit</Link>
					<button
						onClick={() => {
							if (!onDelete) return;

							onDelete(creator.id);
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</>
	);
};

export default Card;
