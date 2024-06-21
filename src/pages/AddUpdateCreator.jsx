import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import ContentWrapper from "../components/ContentWrapper";
import Header from "../components/Header";
import styles from "../styles/AddUpdateCreator.module";

const AddUpdateCreator = ({ type }) => {
	const { id } = useParams();

	const [name, setName] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [description, setDescription] = useState("");
	const [url_youtube, setURL_youtube] = useState("");
	const [url_twitch, setURL_twitch] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const fetchCreator = async () => {
            if (!id) return;

			const { data, error } = await supabase.from("creators").select("*").eq("id", id).single();

			if (error) {
                console.log(error);
			} else {
				setName(data.name);
				setDescription(data.description);
				setImageURL(data.imageURL);
				setURL_youtube(data.url_youtube);
				setURL_twitch(data.url_twitch);
			}
		};

		fetchCreator();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (type === "add") {
			const { data, error } = await supabase.from("creators").insert([
				{
					name,
					imageURL,
					description,
					url_youtube,
					url_twitch,
				},
			]);

			if (error) {
				console.error("Error adding creator:", error);
			} else {
				navigate("/");
			}
		} else if (type === "edit") {
			const { error } = await supabase
				.from("creators")
				.update({
					name,
					imageURL,
					description,
					url_youtube,
					url_twitch,
				})
				.eq("id", id);

			if (error) {
				console.error("Error updating creator:", error);
			} else {
				navigate(`/view/${id}`);
			}
		}
	};

	const handleReset = (e) => {
		setName("");
		setImageURL("");
		setDescription("");
		setURL_youtube("");
		setURL_twitch("");
	};

	return (
		<>
			<Header />
			<ContentWrapper>
				<div className={styles["add-creator"]}>
					<h2 className={styles["spacing"]}>Add Content Creator</h2>
					<form onSubmit={handleSubmit}>
						<div>
							<label className={styles["label"]}>
								<b>Name</b>
								<span>Who do you want to feature?</span>
							</label>
							<input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
						</div>
						<div>
							<label className={styles["label"]}>
								<b>Avatar</b>
								<span>Provide an image URL</span>
							</label>
							<input type="url" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
						</div>
						<div>
							<label className={styles["label"]}>
								<b>Description</b>
								<span>Provide description of the creator</span>
							</label>
							<textarea
								className={styles["description"]}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
						</div>
						<h3 className={styles["spacing"]}>Social Links</h3>
						<div>
							<label className={styles["label"]}>
								<b>YouTube</b>
							</label>
							<input type="url" value={url_youtube} onChange={(e) => setURL_youtube(e.target.value)} />
						</div>
						<div>
							<label className={styles["label"]}>
								<b>Twitch</b>
							</label>
							<input type="url" value={url_twitch} onChange={(e) => setURL_twitch(e.target.value)} />
						</div>
						<div className={styles["buttonContainer"]}>
							<button className={styles["submit"]} type="submit">
								{type === "add" ? "Add" : "Update"}
							</button>
							<button type="reset" onClick={handleReset}>
								Reset
							</button>
						</div>
					</form>
				</div>
			</ContentWrapper>
		</>
	);
};

export default AddUpdateCreator;
