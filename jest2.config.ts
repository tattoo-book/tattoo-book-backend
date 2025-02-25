import { pathsToModuleNameMapper } from 'ts-jest';

export default {
  preset: 'ts-jest',
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@architecture/*': ['src/architecture/*'],
      '@authentication/*': ['src/domains/authentication/*'],
      '@studios/*': ['src/domains/studios/*'],
      '@tattoo-artist/*': ['src/domains/tattoo-artist/*'],
      '@tattoos/*': ['src/domains/tattoos/*'],
      '@users/*': ['src/domains/users/*'],
    },
    { prefix: '<rootDir>' },
  ),
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  },
};
