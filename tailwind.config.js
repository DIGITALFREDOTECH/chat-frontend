const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    flowbite.content(),
    "./src/**/*.tsx"
  ],
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};
