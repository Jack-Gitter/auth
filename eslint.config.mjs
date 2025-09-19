import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    plugins: {
      "@stylistic" : stylistic,
    },
    files: ["**/*.ts"],
    rules: {
      semi: "error",
      "prefer-const": "error",
      '@stylistic/indent': ['error', 2],
    },
  },
]);
