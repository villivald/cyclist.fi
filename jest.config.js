import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/$1",
    "^.+\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/dist/",
    "/.turbo/",
  ],
};

export default createJestConfig(customJestConfig);
