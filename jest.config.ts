import { pathsToModuleNameMapper } from 'ts-jest';

export default {
  preset: 'ts-jest',
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@architecture/*': ['src/architecture/*'],
      '@authentication/*': ['src/modules/authentication/*'],
      '@studios/*': ['src/modules/studios/*'],
      '@tattoo-artist/*': ['src/modules/tattoo-artist/*'],
      '@tattoos/*': ['src/modules/tattoos/*'],
      '@users/*': ['src/modules/users/*'],
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
