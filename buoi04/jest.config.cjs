/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/src/testSetup.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          module: 'CommonJS',
          moduleResolution: 'Node',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          allowArbitraryExtensions: true,
          verbatimModuleSyntax: false,
          types: ['vite/client', 'jest'],
        },
      },
    ],
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/testStyleMock.cjs',
  },
  collectCoverageFrom: ['src/stores/useFavoritesStore.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html', 'lcov'],
  coverageThreshold: {
    './src/stores/useFavoritesStore.ts': {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}
