import pluginJs from '@eslint/js';
import pluginCheckFile from 'eslint-plugin-check-file';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      import: pluginImport,
      react: pluginReact,
      prettier: pluginPrettier,
      'check-file': pluginCheckFile,
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-empty-function': 'off',
      'no-explicit-any': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'explicit-function-return-type': 'off',
      'explicit-module-boundary-types': 'off',
      'linebreak-style': ['error', 'unix'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // disables cross-feature imports:
            // eg. src/features/cart should not import from src/features/product, etc.
            {
              target: './src/features/cart',
              from: './src/features',
              except: ['./cart'],
            },
            {
              target: './src/features/payment',
              from: './src/features',
              except: ['./payment'],
            },
            {
              target: './src/features/product',
              from: './src/features',
              except: ['./product'],
            },
            {
              target: './src/features/transaction',
              from: './src/features',
              except: ['./transaction'],
            },

            // enforce unidirectional codebase:
            // e.g. src/app can import from src/features but not the other way around
            {
              target: './src/features',
              from: './src/app',
            },

            // e.g src/features and src/app can import from these shared modules but not the other way around
            {
              target: [
                './src/components',
                './src/hooks',
                './src/lib',
                './src/types',
                './src/utils',
              ],
              from: ['./src/features', './src/app'],
            },
          ],
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/!(index)*.{ts,tsx}': 'PASCAL_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/*': 'FLAT_CASE',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
