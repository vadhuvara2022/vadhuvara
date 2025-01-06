module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@next/next/recommended',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Disable this rule
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  