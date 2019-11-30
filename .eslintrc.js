module.exports = {
	extends: ['react-app', 'airbnb', 'prettier'],
	plugins: ['prettier', 'react-hooks', 'jest'],
	parser: 'babel-eslint',
	rules: {
		indent: ['off', 'tab', { SwitchCase: 1 }],
		'no-plusplus': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'linebreak-style': 'off',
		'prettier/prettier': ['error'],
		'react/jsx-filename-extension': 'off',
		'react/jsx-indent': ['off', 'tab', { checkAttributes: true }],
		'react-hooks/rules-of-hooks': 'error',
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-indent-props': 'off',
		'react/jsx-curly-newline': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/state-in-constructor': 'off',
		'react/static-property-placement': 'off',
	},
	env: {
		'jest/globals': true,
	},
};
