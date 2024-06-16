import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddUpdateCreator from "./pages/AddUpdateCreator";
import Home from "./pages/Home";
import ViewCreator from "./pages/ViewCreator";
import "./styles/index";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "view/:id",
		element: <ViewCreator />,
	},
	{
		path: "edit/:id",
		element: <AddUpdateCreator type="edit" />,
	},
	{
		path: "add",
		element: <AddUpdateCreator type="add" />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
