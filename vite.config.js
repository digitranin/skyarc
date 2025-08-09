import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/skyarc/", // For GitHub Pages
  plugins: [react()],
});
