/**
 * @see https://github.com/lint-staged/lint-staged?tab=readme-ov-file#configuration
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*': 'prettier --write --ignore-unknown',
  '*.{js,jsx,ts,tsx,vue}': 'eslint --fix',
  '*.{ts,tsx,vue}': () => 'vue-tsc --project tsconfig.app.json',
  '*.{css,scss}': 'stylelint --fix',
};
