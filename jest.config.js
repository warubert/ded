module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    transform: {
        '^.+\\.(ts|js|html)$': 'jest-preset-angular',
        '^.+\\.(js|jsx)$': 'babel-jest',
        "\\.js$": "<rootDir>/node_modules/babel-jest",
      },
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    },
    transformIgnorePatterns: [
      'node_modules/(?!.*\\.mjs$)',
    ],
  };
  