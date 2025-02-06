/**
 * @see https://commitlint.js.org/reference/configuration.html#configuration
 * @type {import('@commitlint/types').UserConfig}
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', ['sentence-case']],
  },
};
