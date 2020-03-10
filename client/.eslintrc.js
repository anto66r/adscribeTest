module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  overrides: [{
    files: [
      "**/*.test.jsx",
      "**/*.test.js"
    ],
    env: {
      jest: true
    }
  }],
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:testing-library/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "testing-library"
  ],
  rules: {
    semi: [2, "always"],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    ],
    "import/extensions": 0,
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "react/button-has-type": "off",
    "react/prop-types": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "arrow-parens": ["error", "as-needed"],
    "jsx-a11y/label-has-associated-control": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/jsx-one-expression-per-line": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "no-underscore-dangle": "off",
    "no-extra-semi": "off",
    "no-prototype-builtins": "off",
    "@typescript-eslint/camelcase": 'off',
    "max-len": [2, 180, 4, {
      ignoreUrls: true
    }],
    "no-param-reassign": "off",
    "testing-library/await-async-query": "error",
    "testing-library/no-await-sync-query": "error",
    "testing-library/no-debug": "error",
    "no-console": "error",
    "no-debugger": "error"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
