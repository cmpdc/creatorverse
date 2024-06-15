import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import Header from "../components/Header";
import styles from "../styles/AddCreator.module";

const AddCreator = () => {
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [description, setDescription] = useState("");
	const [imageURL, setImageURL] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data, error } = await supabase.from("creators").insert([
			{
				name,
				url,
				description,
				imageURL,
			},
		]);

		if (error) {
			console.error("Error adding creator:", error);
		} else {
			navigate("/");
		}
	};

	return (
		<>
			<Header />
			<div className={styles["add-creator"]}>
				<h1>Add Content Creator</h1>
				<form onSubmit={handleSubmit}>
					<input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
					<input type="url" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
					<textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
					<input type="url" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
					<button type="submit">Add</button>
				</form>
			</div>
		</>
	);
};

export default AddCreator;
