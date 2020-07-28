module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: [
    'js',
    'json',
    // tell Jest to handle `*.vue` files
    'vue',
  ],
  transform: {
    // process `*.vue` files with `vue-jest`
    '.*\\.(vue)$': 'vue-jest',
  },
  coverageDirectory: 'tests/coverage',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js'],
};
