/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["__tests__/utils", "__tests__/helpers"],
  moduleNameMapper: {
    "^@api(.*)$": "<rootDir>/src/api$1",
    "^@cli(.*)$": "<rootDir>/src/cli$1",
    "^@config(.*)$": "<rootDir>/src/config$1",
    "^@constants(.*)$": "<rootDir>/src/constants$1",
    "^@customTypes(.*)$": "<rootDir>/src/types$1",
    "^@decorators(.*)$": "<rootDir>/src/decorators$1",
    "^@drivers(.*)$": "<rootDir>/src/drivers$1",
    "^@errors(.*)$": "<rootDir>/src/api/errors$1",
    "^@interfaces(.*)$": "<rootDir>/src/interfaces$1",
    "^@models(.*)$": "<rootDir>/src/models$1",
    "^@repositories(.*)$": "<rootDir>/src/repositories$1",
    "^@schemas(.*)$": "<rootDir>/src/api/schemas$1",
    "^@services(.*)$": "<rootDir>/src/services$1",
    "^@start(.*)$": "<rootDir>/src/start$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
    "^@tests(.*)$": "<rootDir>/src/__tests__$1",
    "^@containers(.*)$": "<rootDir>/src/containers$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
