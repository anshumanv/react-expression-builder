module.exports = {
	components: 'src/*.tsx',
	propsParser: require('react-docgen-typescript').withCustomConfig(
		'./tsconfig.json'
	).parse,
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.(tsx|ts)?$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				}
			]
		}
	}
}
