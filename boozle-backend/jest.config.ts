module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'boozle-backend/tsconfig.json',
      isolatedModules: true
    },
  },
  testMatch: ['**/*.test.ts'],
};
