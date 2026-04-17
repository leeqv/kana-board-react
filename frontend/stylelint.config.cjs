module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss"
  ],
  customSyntax: require("postcss-scss"),
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["return", "function", "if", "each", "include", "mixin", "use"] 
      }
    ],
    "at-rule-empty-line-before": [
      "always",
      {
        ignoreAtRules: ["mixin", "import", "media", "include", "supports", "return", "use"] 
      }
    ],
    "selector-class-pattern": null,
    "no-descending-specificity": null,
    "color-function-alias-notation": null,
  },
}
