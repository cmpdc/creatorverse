import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module";

const links = [
	{
		path: "/",
		name: "Home",
	},
	{
		path: "/add",
		name: "Add Creator",
	},
];

const Header = () => {
	return (
		<>
			<header className={styles["wide"]}>
				<h1>Content Creators</h1>
				<nav className={styles["links"]}>
					{links.map((link, index) => {
						return (
							<Link to={link.path} className={styles["button"]} key={index}>
								{link.name}
							</Link>
						);
					})}
				</nav>
			</header>
		</>
	);
};

export default Header;
