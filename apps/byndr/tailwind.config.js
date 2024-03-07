const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
/** @type {import('tailwindcss').Config} */
const baseConfig = require(`${__dirname}/../../libs/ui/tailwind.config.js`)

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ]
};
