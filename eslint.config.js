// eslint.config.js
import { defineConfig } from "eslint-define-config";

export default defineConfig({
  root: true,
  env: { browser: true, node: true, es2021: true },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  rules: {
    "no-unused-vars": "warn",
    "vue/no-unused-vars": "warn"
  }
});
