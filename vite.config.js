import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom", // ✅ Use "jsdom" for React tests
    setupFiles: "./vitest.setup.js", // Optional: Use if you need Firebase/Auth mocks
    coverage: {
      provider: "c8",
      reporter: ["text", "json", "html"]
    }
  }
});
