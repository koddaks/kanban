/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions } */
const config = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
