const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/integration/**/*.spec.js",
    supportFile: "cypress/support/index.js",
    setupNodeEvents(on, config) {
      return config;
    },
  },
  env: {
    viewports: ["ipad-2", "iphone-6", "macbook-11"],
    orientations: ["portrait", "landscape"],
  },
});
