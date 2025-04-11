import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "prettier",
      "plugin:jsx-a11y/recommended",
      "plugin:prettier/recommended",
    ],
    plugins: ["jsx-a11y", "prettier"],
  }),
];

export default eslintConfig;
