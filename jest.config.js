
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(test|spec).ts?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/SetupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^container/useApi$": "<rootDir>/src/__mocks__/container/useApi.ts",
  },
};
