module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
    },
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "warn",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-unused-vars": [
      "off"
    ],
    "no-console": [
      "warn"
    ],
    "no-undef": [
      "off"
    ]
  }
};