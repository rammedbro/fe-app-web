export default {
  '*.{ts,tsx,vue}': 'fe-app-scripts lint-types',
  '*.{js,jsx,ts,tsx,vue}': 'eslint --fix',
  '*.{css,scss}': 'stylelint --fix',
};
