const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '**/*.{ts,tsx}': () => 'yarn tsc --noEmit',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand], //nextjs suggestion
  // '*.{js,jsx,ts,tsx}': 'eslint --fix',
  '*.{md,html,css,json}': 'prettier --write',
}
