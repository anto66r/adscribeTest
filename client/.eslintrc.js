module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "semi": [2, "always"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "import/extensions": 0,
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "react/button-has-type": "off",
    "react/prop-types": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "arrow-parens": ["error" , "as-needed"],
    "jsx-a11y/label-has-associated-control": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/jsx-one-expression-per-line": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "no-underscore-dangle": "off",
    "no-prototype-builtins": "off"

  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
