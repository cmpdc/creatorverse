import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import styles from "../styles/ViewCreator.module";

const ViewCreator = () => {
	const { id } = useParams();
	const [creator, setCreator] = useState(null);

	useEffect(() => {
		const fetchCreator = async () => {
			const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();

			if (error) {
				console.error("Error fetching creator:", error);
			} else {
				setCreator(data);
			}
		};

		fetchCreator();
	}, [id]);

	if (!creator) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles["view-creator"]}>
			<h1>{creator.name}</h1>
			<img src={creator.imageURL} alt={creator.name} />
			<p>{creator.description}</p>
			<a href={creator.url} target="_blank" rel="noopener noreferrer">
				Visit
			</a>
		</div>
	);
};

export default ViewCreator;
