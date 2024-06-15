import React from "react";
import styles from "../styles/ContentWrapper.module";

const ContentWrapper = ({ children }) => {
	return (
		<>
			<div className={styles["content"]}>{children}</div>
		</>
	);
};

export default ContentWrapper;
