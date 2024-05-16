module.exports = {
    testEnvironment: 'node',
    rootDir: '.',
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
    ],
    testRegex: '(/test/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['js', 'ts'],
    transform: {
        '^.+\\.ts?$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    }
};
