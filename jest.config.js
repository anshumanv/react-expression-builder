module.exports = {
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},

	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			diagnostics: false
		}
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	modulePathIgnorePatterns: ['<rootDir>/dist'],
	testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/']
}
