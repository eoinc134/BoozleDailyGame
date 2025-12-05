// jest.config.mjs
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  roots: ['<rootDir>/boozle-backend/src'],
  collectCoverage: true,
  collectCoverageFrom: [
    'boozle-backend/src/**/*.{ts}',
    '!boozle-backend/src/**/*.d.ts'
  ],
  coverageDirectory: '<rootDir>/boozle-backend/coverage',
  modulePathIgnorePatterns: ['<rootDir>/boozle-backend/dist/'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  transformIgnorePatterns: ['node_modules/']
};
