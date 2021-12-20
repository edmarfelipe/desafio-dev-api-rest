module.exports = {
  moduleNameMapper: {
    '@application/(.*)': '<rootDir>/application/$1',
    '@infra/(.*)': '<rootDir>/infra/$1',
    '@domain/(.*)': '<rootDir>/domain/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
