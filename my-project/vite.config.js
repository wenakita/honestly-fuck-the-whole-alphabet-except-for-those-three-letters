import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Make sure the axios package points to the correct path
      axios: path.resolve(
        new URL("node_modules/axios", import.meta.url).pathname
      ),
    },
  },
});
