import React, { useEffect, useState } from "react";
import { FaTwitch } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../client";
import ContentWrapper from "../components/ContentWrapper";
import Header from "../components/Header";
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

	return (
		<>
			<Header />
			<ContentWrapper>
				<div className={styles["view-creator"]}>
					{creator ? (
						<>
							<div className={styles["top"]}>
								<div className={styles["avatar"]}>
									<img src={creator.imageURL} alt={creator.name} />
								</div>
								<div className={styles["right"]}>
									<h1>{creator.name}</h1>
									<div className={styles["links"]}>
										{creator.url_youtube && (
											<a className={styles["youtube"]} href={creator.url_youtube} target="_blank" rel="noopener noreferrer">
												<GrYoutube color={"#ff0000"} />
												<span>{creator.url_youtube}</span>
											</a>
										)}
										{creator.url_twitch && (
											<a className={styles["twitch"]} href={creator.url_twitch} target="_blank" rel="noopener noreferrer">
												<FaTwitch color={"#9146ff"} />
												<span>{creator.url_twitch}</span>
											</a>
										)}
									</div>
									<div className={styles["buttonContainer"]}>
										<Link to={`/edit/${creator.id}`}>Edit</Link>
										<a
											onClick={() => {
												if (!onDelete) return;

												onDelete(creator.id);
											}}
										>
											Delete
										</a>
									</div>
								</div>
							</div>
							<div className={styles["description"]}>{creator.description}</div>
						</>
					) : (
						<div>Loading...</div>
					)}
				</div>
			</ContentWrapper>
		</>
	);
};

export default ViewCreator;
