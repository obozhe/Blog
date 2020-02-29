module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-underscore-dangle": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading":"off",
    "no-param-reassign": "off",
  },
  overrides: [
    {
      files: [
        "**/*.test.js",
        "**/*.test.jsx"
      ],
      env: {
        jest: true
      }
    }
  ]
};
