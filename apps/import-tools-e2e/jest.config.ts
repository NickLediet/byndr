/* eslint-disable */
import type { Config } from 'jest';

export default {
  displayName: 'import-tools-e2e',
  preset: '../..//jest.preset.js',
  setupFiles: ['<rootDir>/src/test-setup.ts'],
  testMatch: [ '<rootDir>/src/**/*.spec.ts' ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../..//coverage/import-tools-e2e',
} as Config;
