module.exports = {
  env: {
  browser: true,
  es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  plugins: ["react", "react-hooks", "jsx-a11y", "prettier", "react-compiler", "@typescript-eslint"],
  ignorePatterns: [".eslintrc.cjs", "**/*.json, **/*.config.ts"],
  rules: {
    "react-compiler/react-compiler": "error",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react/react-in-jsx-scope": "off",
  },
};
