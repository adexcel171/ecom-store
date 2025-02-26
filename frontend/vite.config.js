import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://ecom-api-z687.onrender.com",
      "/uploads/": "http://localhost:5000",
    },
  },
});
