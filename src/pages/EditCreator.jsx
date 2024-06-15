import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import styles from "../styles/EditCreator.module.scss";

const EditCreator = () => {
	const { id } = useParams();
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [description, setDescription] = useState("");
	const [imageURL, setImageURL] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCreator = async () => {
			const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();

			if (error) {
				console.error("Error fetching creator:", error);
			} else {
				setName(data.name);
				setUrl(data.url);
				setDescription(data.description);
				setImageURL(data.imageURL);
			}
		};

		fetchCreator();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { error } = await supabase
			.from("creators")
			.update({
				name,
				url,
				description,
				imageURL,
			})
			.eq("id", id);
		if (error) {
			console.error("Error updating creator:", error);
		} else {
			navigate(`/view/${id}`);
		}
	};

	return (
		<div className={styles["edit-creator"]}>
			<h1>Edit Content Creator</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
				<input type="url" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
				<textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
				<input type="url" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
				<button type="submit">Update</button>
			</form>
		</div>
	);
};

export default EditCreator;
