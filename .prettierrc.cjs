/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 140,
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  trailingComma: 'all',
  arrowParens: 'always',
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: [
    '^react$',
    '^react-dom/(.*)$',
    '^@tauri-apps/(.*)$',
    '^vite$',
    '^@vitejs/(.*)$',
    '^vite-(.*)$',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '~/(.*)$',
    '',
    '^[./]',
  ],
};
