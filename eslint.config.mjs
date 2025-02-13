import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'),
    {
        plugins: {
            prettier,
            '@typescript-eslint': typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },

        settings: {
            'import/resolver': {
                typescript: {},
            },
        },

        rules: {
            'prettier/prettier': [
                'error',
                {
                    printWidth: 120,
                    singleQuote: true,
                    trailingComma: 'es5',
                    semi: true,
                    endOfLine: 'auto',
                    useTabs: false,
                    tabWidth: 4,
                },
            ],

            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];
