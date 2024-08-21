import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import * as parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['dist/**', '**/*.spec.ts', '**/*.e2e-spec.ts'],
    plugins: {
      typescript: typescriptPlugin,
    },
    languageOptions: {
      parser,
      parserOptions: {
        porject: './tsconfig.json',
        programs: [parser.createProgram('tsconfig.json')],
      },
    },
  },
];
