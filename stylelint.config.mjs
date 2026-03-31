/** @type {import('stylelint').Config} */
const config = {
  extends: "stylelint-config-standard",
  rules: {
    "selector-class-pattern": "(.*?)",
    "selector-id-pattern": "(.*?)",
    "custom-property-pattern": "(.*?)",
    "keyframes-name-pattern": "(.*?)",
  },
  ignoreFiles: ["**/coverage/**", "**/test-results/**"],
};

export default config;
