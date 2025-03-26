import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const config = tseslint.config(
  {
    ignores: ['**/build/**', '**/dist/**', "node_modules/**/*", "eslint.config.mjs", "**/coverage/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-misused-promises": "off"
    }
  }
);

export default config;
