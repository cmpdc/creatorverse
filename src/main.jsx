import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
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
		element: <EditCreator />,
	},
	{
		path: "add",
		element: <AddCreator />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
