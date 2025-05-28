import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script", // <- para CommonJS
      globals: {
        ...globals.node,     // <- Node.js globals como require, module, __dirname
      },
    },
    plugins: {},
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "comma-dangle": ["error", "only-multiline"],
    },
  },
  {
    ignores: ["node_modules", "dist", "data"],
  },
]);
