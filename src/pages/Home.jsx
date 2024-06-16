import React, { useEffect, useState } from "react";
import { HiViewGrid } from "react-icons/hi";
import { MdViewList } from "react-icons/md";
import Masonry from "react-masonry-css";
import { supabase } from "../client";
import Card from "../components/Card";
import ContentWrapper from "../components/ContentWrapper";
import Header from "../components/Header";
import styles from "../styles/Home.module";
import { cn } from "../utils/classnames";

const breakpointColumnsObj = {
	default: 4,
	2000: 4,
	1500: 3,
	900: 2,
	600: 1,
};

const Home = () => {
	const [creators, setCreators] = useState([]);
	const [gridViewType, setGridViewType] = useState("grid");
	const [breakpointCols, setBreakpointCols] = useState(breakpointColumnsObj);

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

	useEffect(() => {
		setBreakpointCols(gridViewType === "grid" ? breakpointColumnsObj : 1);
	}, [gridViewType]);

	const handleDelete = async (id) => {
		const { error } = await supabase.from("creators").delete().eq("id", id);

		if (error) {
			console.error("Error deleting creator:", error);
		} else {
			setCreators(creators.filter((creator) => creator.id !== id));
		}
	};

	return (
		<>
			<Header />
			<ContentWrapper>
				<div className={styles["home"]} type={gridViewType}>
					{creators && creators.length ? (
						<>
							<div className={styles["switchView"]}>
								<div
									className={cn(styles["viewButton"], {
										[styles["active"]]: gridViewType === "grid",
									})}
									onClick={() => {
										setGridViewType("grid");
									}}
								>
									<HiViewGrid />
								</div>
								<div
									className={cn(styles["viewButton"], {
										[styles["active"]]: gridViewType === "list",
									})}
									onClick={() => {
										setGridViewType("list");
									}}
								>
									<MdViewList />
								</div>
							</div>
							<Masonry breakpointCols={breakpointCols} className={styles["grid"]} columnClassName={styles["gridColumn"]}>
								{creators.map((creator) => {
									return <Card key={creator.id} creator={creator} onDelete={handleDelete} type={gridViewType} />;
								})}
							</Masonry>
						</>
					) : (
						<div className={styles["gridEmpty"]}>
							<span>No creators added. Would you like to add some?</span>
						</div>
					)}
				</div>
			</ContentWrapper>
		</>
	);
};

export default Home;
