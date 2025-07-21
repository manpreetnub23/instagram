import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				cream: "#f4f1ea",
				brown: "#3d2b1f",
				lightBrown: "#b29f8c",
				beige: "#e6d7c3",
				igBlue: "#3b5998",
			},
			fontFamily: {
				retro: ["'Josefin Sans'", "sans-serif"],
			},
		},
	},
	plugins: [react(), tailwindcss()],
});
