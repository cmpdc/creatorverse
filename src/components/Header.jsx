import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module";
import { cn } from "../utils/classnames";

const links = [
	{
		path: "/",
		name: "Home",
	},
	{
		path: "/add",
		name: "Add",
	},
];

const randomBannerClassNames = [styles["one"], styles["two"], styles["three"]];

const getRandomClass = () => {
	const randomIndex = Math.floor(Math.random() * randomBannerClassNames.length);
	return randomBannerClassNames[randomIndex];
};

const Header = () => {
	const [randomClass, setRandomClass] = useState(getRandomClass());
	const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });

	const headerElemRef = useRef();

	useEffect(() => {
		const handleMouseMove = (event) => {
			let backgroundY = 100 / window.innerHeight;
			let backgroundX = 100 / window.innerWidth;

			const x = (backgroundX * event.clientX) / 10 + 50;
			const y = (backgroundY * event.clientY) / 10 + 50;

			setBackgroundPosition({ x, y });
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<>
			<header ref={headerElemRef} className={cn(styles["bannerContainer"])}>
				<div
					className={cn(styles.banner, randomClass)}
					style={{
						backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
					}}
				></div>
				<h1 className={cn(styles["title"], randomClass)}>CreatorVerse</h1>
				<nav className={styles["links"]}>
					{links.map((link, index) => {
						return (
							<NavLink
								to={link.path}
								className={({ isActive }) => {
									return cn(styles["button"], {
										[styles["active"]]: isActive,
									});
								}}
								key={index}
							>
								{link.name}
							</NavLink>
						);
					})}
				</nav>
			</header>
		</>
	);
};

export default Header;
