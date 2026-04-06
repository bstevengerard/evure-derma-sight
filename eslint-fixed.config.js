import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  globalIgnores(['dist']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.recommended,
  reactRefresh.flatConfigs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
    settings: {
      react: {
        version: '18.3',
      },
    },
  }
);
