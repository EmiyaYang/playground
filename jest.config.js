// process.env.VUE_CLI_BABEL_TARGET_NODE = true;
// process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  // #76 https://github.com/jest-community/vscode-jest/issues/76#issuecomment-569465181
  watchPathIgnorePatterns: ["/node_modules/"]
};
