/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  quoteProps: 'as-needed',
  singleQuote: true,
  arrowParens: 'always',
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  proseWrap: 'always',
  bracketSpacing: true,
  trailingComma: 'es5',
  semi: true,
  jsxSingleQuote: false,
  bracketSameLine: false,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
};

export default config;
