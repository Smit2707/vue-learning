module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended', 'prettier'],
  plugins: ['node'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': 'off',
    'node/no-unpublished-require': 'off',
    'no-console': 'off',
    'prefer-const': 'error',
    'no-var': 'error',
  },
};
