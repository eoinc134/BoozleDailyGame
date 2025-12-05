// jest.config.mjs
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/boozle-backend/src'],
  collectCoverage: true,
  collectCoverageFrom: [
    'boozle-backend/src/**/*.{ts,tsx}',
    '!boozle-backend/src/**/*.d.ts'
  ],
  coverageDirectory: 'boozle-backend/coverage',
  modulePathIgnorePatterns: ['<rootDir>/boozle-backend/dist/'],
};
