import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const NO_COMMENTS_MESSAGE =
  'Este proyecto prohibe comentarios. Convertir la explicacion en un nombre, una constante o un test.';

const ROUTE_HANDLER_MAX_LINES = 30;

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**', 'coverage/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    files: ['**/*.{ts,tsx,mjs,js}'],
    rules: {
      'no-inline-comments': 'error',
      'no-warning-comments': [
        'error',
        { terms: ['todo', 'fixme', 'hack', 'xxx'], location: 'anywhere' },
      ],
      'multiline-comment-style': 'off',
      'line-comment-position': 'off',
    },
  },
  {
    files: ['app/**/page.tsx', 'components/**/*.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='fetch'] > Literal[value=/^\\/api/]",
          message:
            'Los Server Components deben usar lib/content/repository directamente, no la API HTTP interna.',
        },
      ],
    },
  },
  {
    files: ['app/api/**/route.ts'],
    rules: {
      'max-lines': [
        'error',
        { max: ROUTE_HANDLER_MAX_LINES, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    files: ['app/**/*.tsx', 'components/**/*.tsx', 'lib/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/content/*', '../content/*', '../../content/*'],
              message: 'El contenido solo se importa desde lib/content/source.ts.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['lib/content/**/*.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
];

export default config;
export { NO_COMMENTS_MESSAGE };
