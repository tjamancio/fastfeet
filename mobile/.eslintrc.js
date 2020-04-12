module.exports = {
  root: true,
  extends: ['@react-native-community', "prettier", "prettier/react"],
  plugins: ["react", "react-hooks", "import", "eslint-plugin-import-helpers"],

  rules: {
    "import-helpers/order-imports": [
      "warn",
      {
        // example configuration
        "newlinesBetween": "always",
        "groups": [
          ["/^react$/", "/^react-native$/"],
          "module",
          ["/^~/"],
          ['parent', 'sibling', 'index'],
        ],
        "alphabetize": { "order": "asc", "ignoreCase": true }
      }
    ],
    "prettier/prettier": "warn",
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "import/prefer-default-export": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off",
    "global-require": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    camelcase: "off",
    "no-console": ["error", { allow: ["tron"] }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "error",
    "react/require-default-props": "error",
    "no-alert": 'off'
  },
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src"
      }
    }
  }
};
