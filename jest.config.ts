module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
    transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    ],
    moduleNameMapper: {
      "^.+\\.module\\.css$": "identity-obj-proxy",
      "^.+\\.(css|png|jpg|jpeg)$": "<rootDir>/src/tests/fileMock.js",
    },
  };