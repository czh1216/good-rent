module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'eol-last': 'off',
    'spaced-comment': 'off',
    'vue/multi-word-component-names': 'off',
    'no-throw-literal': 'off',
    'vue/require-prop-type-constructor': 'off',
    'no-dupe-keys': 'off',
    'no-unused-expressions': 'off',
    'no-sequences': 'off'
  }
}
