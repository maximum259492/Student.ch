module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:next/recommended', // Add this line
  ],
  settings: {
    react: {
      version: 'detect', // Automatically detect the installed React version
    },
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true // Enable JSX parsing
    },
    sourceType: 'module', // Assuming ES modules (import/export)
    ecmaVersion: 2021
  },

  env: {
    browser: true, // Enable browser global variables
    node: true, // Enable Node.js global variables and scoping
    es2021: true // Enable all ECMAScript 2021 globals
  },
  globals: {
    window: true,
    module: true
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': 'error',
'no-trailing-spaces': 'error',
'no-irregular-whitespace': 'error',
'no-undef': 'error',
'no-unused-vars': 'error',
'no-use-before-define': 'error',
'no-const-assign': 'error',
'no-var': 'error',
'prefer-const': 'error',
'prefer-destructuring': 'error',
'sort-imports': 'error',
'no-duplicate-imports': 'error',
'no-useless-constructor': 'error',
'no-useless-return': 'error',
  }
}
