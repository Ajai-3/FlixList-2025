// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.node,
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    rules: {
      // Core Quality Rules
      curly: "error",
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "warn",
      "no-useless-return": "error",
      "no-duplicate-imports": "error",

      // TypeScript Rules
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/return-await": "error",

      // Code Style & Formatting
      "quotes": ["error", "single", { "avoidEscape": true }], 
      "object-shorthand": ["error", "always"],
      "arrow-body-style": ["error", "as-needed"],

      // Import Style
      "sort-imports": ["warn", {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      }],
      "import/order": "off"
    }
  }
]);
