import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**.spec.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:3000/",
  },
});
