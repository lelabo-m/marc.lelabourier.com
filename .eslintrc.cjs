/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    // i18n config
    "react/jsx-no-literals": "error",
    // Consistently import navigation APIs from `@/i18n/routing`
    "no-restricted-imports": [
      "error",
      {
        name: "next/link",
        message: "Please import from `~/i18n/routing` instead.",
      },
      {
        name: "next/navigation",
        importNames: [
          "redirect",
          "permanentRedirect",
          "useRouter",
          "usePathname",
        ],
        message: "Please import from `~/i18n/routing` instead.",
      },
    ],
  },
};
module.exports = config;
