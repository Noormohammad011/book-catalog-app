/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    // General ESLint Rules
    'no-console': 'error',
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-destructuring': 'error',

    // React-specific Rules
    'react/prop-types': 'off', // Disable prop-types since React now has TypeScript/PropTypes
    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-key': 'error',
    'react/jsx-max-props-per-line': [
      'error',
      { maximum: 1, when: 'multiline' },
    ],
    'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-props-no-spreading': 'off', // Enable this rule if you don't use prop spreading
    'react/react-in-jsx-scope': 'off', // Enable this rule if you're not using React 17+ with automatic JSX transformation

    // React Hooks Rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Import Rules
    'import/no-unresolved': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'prettier/prettier': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
