module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
      es6: true,
      node: true
    },
    plugins: ['@typescript-eslint'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'standard'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module'
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        "indent": ["error", 2, { "SwitchCase": 1 }],
        "@typescript-eslint/explicit-function-return-type": "off"
    }
  }