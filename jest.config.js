/** @type {import('jest').Config} */
const config = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-redux)',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@core/(.*)$': '<rootDir>/src/core/$1',
        '^@features/(.*)$': '<rootDir>/src/features/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@auth/(.*)$': '<rootDir>/src/features/auth/$1',
        '^@lists/(.*)$': '<rootDir>/src/features/lists/$1',
        '^@theme/(.*)$': '<rootDir>/src/features/theme/$1',
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/index.ts',
        '!src/**/*.stories.{ts,tsx}',
    ],
    testMatch: [
        '**/__tests__/**/*.{ts,tsx}',
        '**/*.{test,spec}.{ts,tsx}',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    roots: ['<rootDir>/src'],
    testEnvironment: 'node',
    clearMocks: true,
    restoreMocks: true,
};

module.exports = config;

