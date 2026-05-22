const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-plugin-prettier');

module.exports = [
  {
    ignores: [
      'node_modules',
      'eslint.config.js',
      'prettier.config.js',
      'tsconfig.json',
      'dist',
      'lib',
      'es',
      'jest.config.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];
