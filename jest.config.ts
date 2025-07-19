import { pathsToModuleNameMapper } from 'ts-jest';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@external/*': ['src/external/*'],
      '@core/*': ['src/@core/*'],
      '@domains/*': ['src/domains/*'],
      '@tattoo-book-architecture/*': ['libs/tattoo-book-architecture/src/*'],
    },
    {
      prefix: '<rootDir>/',
    },
  ),
};
