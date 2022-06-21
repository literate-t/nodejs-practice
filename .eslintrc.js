module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    node: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:node/recommended', 'prettier'],
};
