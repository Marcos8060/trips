module.exports = {
    testEnvironment: 'jest-environment-jsdom', 
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  };
  