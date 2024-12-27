module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'vue',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      'jsx': true,
    },
  },
  rules: {
    'curly': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'eqeqeq': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'no-console': [
      'error',
      { allow: ['warn', 'error', 'time', 'info', 'timeEnd'] },
    ],
    'no-undef': 'off',
    'no-new': 'error',
    'no-var': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'no-prototype-builtins': 'error',

    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2, { 'SwitchCase': 1 }],
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'brace-style': 'off',
    '@typescript-eslint/brace-style': 'error',
    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': 'error',
    'key-spacing': 'off',
    '@typescript-eslint/key-spacing': ['error', { mode: 'strict' }],
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error', { before: true }],
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': [
      'error',
      'always',
    ],
    'padding-line-between-statements': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      { blankLine: 'never', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: '*', next: ['return', 'function'] },
      { blankLine: 'always', prev: 'function', next: '*' },
    ],
    'space-before-blocks': 'off',
    '@typescript-eslint/space-before-blocks': 'error',
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    'vue/multi-word-component-names': 'off',
    'vue/attributes-order': 'error',
    'vue/html-indent': 'off',
    'vue/max-len': [
      'error',
      {
        code: 120,
        template: 120,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreHTMLAttributeValues: true,
      },
    ],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      { singleline: 5, multiline: 1 },
    ],
    'vue/block-lang': ['error', {
      script: {
        lang: 'ts',
      },
    }],
  },
};
