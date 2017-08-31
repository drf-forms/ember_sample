module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    }
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
    'no-console': [2, {allow: ['warn', 'error']}],
    'semi': [2, 'always'],
    'no-debugger': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-extra-semi': 2,
    'curly': 2,
    'eqeqeq': 2,
    'no-alert': 2,
    'no-else-return': 2,
    'indent': [2, 2],
    'no-trailing-spaces': 2,
    'quotes': [2, 'single'],
    'semi-spacing': [2, {before: false, after: true}],
    'space-before-blocks': 2,
    'space-before-function-paren': [2, 'never'],
    'arrow-body-style': [2, 'always'],
    'arrow-parens': [2, 'always'],
    'arrow-spacing': [2, {before: true, after:true}],
    'no-empty': 2,
    'no-var': 2,
    'prefer-const': 2,
    'no-extra-bind': 1,
    'no-extra-parens': 1    
  }
};

