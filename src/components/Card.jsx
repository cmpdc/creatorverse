import React from "react";
import { FaTwitch } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";
import { Link } from "react-router-dom";
import styles from "../styles/Card.module";

const Card = ({ creator, onDelete, type }) => {
	if (!creator) return null;

	const randomTruncateLength = () => {
		const lengths = [100, 250, 550];
		return lengths[Math.floor(Math.random() * lengths.length)];
	};

	const truncateLength = randomTruncateLength();

	const truncatedDescription = () => {
		return creator.description.length > truncateLength ? `${creator.description.substring(0, truncateLength)}...` : creator.description;
	};

	return (
		<>
			<div className={styles["card"]} type={type === "grid" ? "mini" : "wide"}>
				<div className={styles["avatar"]}>
					<Link to={`/view/${creator.id}`}>
						<div className={styles["avatarBG"]} style={{ backgroundImage: `url("${creator.imageURL}")` }} />
					</Link>
				</div>
				<div className={styles["content"]}>
					<h2>{creator.name}</h2>
					<div className={styles["links"]}>
						{creator.url_youtube && (
							<a href={creator.url_youtube} target="_blank" rel="noopener noreferrer">
								<GrYoutube color={"#ff0000"} />

								<span>YouTube</span>
							</a>
						)}
						{creator.url_twitch && (
							<a href={creator.url_twitch} target="_blank" rel="noopener noreferrer">
								<FaTwitch color={"#9146ff"} />
								<span>Twitch</span>
							</a>
						)}
					</div>
					<div className={styles["description"]}>{truncatedDescription()}</div>
					<div className={styles["card-actions"]}>
						<Link to={`/view/${creator.id}`}>View</Link>
						<Link to={`/edit/${creator.id}`}>Edit</Link>
						<a
							href="#"
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
		</>
	);
};

export default Card;
