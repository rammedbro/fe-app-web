import eslint from '@eslint/js';
import vueEslint from 'eslint-plugin-vue';
import tsEslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

/**
 * @see https://eslint.org/docs/latest/use/configure/
 */
export default tsEslint.config(
  eslint.configs.recommended,
  tsEslint.configs.recommended,
  {
    files: ['**/*.vue'],
    extends: [vueEslint.configs['flat/recommended']],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsEslint.parser,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      'no-undef': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/no-use-v-if-with-v-for': 'off',
    },
  },
  {
    ignores: ['node_modules', 'build', 'src/shared/api/openapi', 'src/app/ambient/auto-imports.d.ts'],
  }
);
