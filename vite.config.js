import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		extensions: [".scss", ".js", ".jsx"],
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"~@picocss/pico": path.resolve(__dirname, "./node_modules/@picocss/pico"),
		},
	},
	server: {
		port: 6969,
	},
});
