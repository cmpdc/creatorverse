import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { supabase } from "../client";
import Card from "../components/Card";
import ContentWrapper from "../components/ContentWrapper";
import Header from "../components/Header";
import styles from "../styles/Home.module";

const Home = () => {
	const [creators, setCreators] = useState([]);

	useEffect(() => {
		const fetchCreators = async () => {
			const { data, error } = await supabase.from("creators").select("*");

			if (error) {
				console.error("Error fetching creators:", error);
			} else {
				setCreators(data);
			}
		};

		fetchCreators();
	}, []);

	const handleDelete = async (id) => {
		const { error } = await supabase.from("creators").delete().eq("id", id);

		if (error) {
			console.error("Error deleting creator:", error);
		} else {
			setCreators(creators.filter((creator) => creator.id !== id));
		}
	};

	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		500: 1,
	};

	return (
		<>
			<div className={styles["home"]}>
				<Header />
				<ContentWrapper>
					{creators && creators.length ? (
						<Masonry breakpointCols={breakpointColumnsObj} className={styles["grid"]} columnClassName={styles["gridColumn"]}>
							{creators.map((creator) => {
								return <Card key={creator.id} creator={creator} onDelete={handleDelete} />;
							})}
						</Masonry>
					) : (
						<div className={styles["gridEmpty"]}>
							<span>No creators added. Would you like to add some?</span>
						</div>
					)}
				</ContentWrapper>
			</div>
		</>
	);
};

export default Home;
