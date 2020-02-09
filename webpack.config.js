var path = require('path')
var PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin')

module.exports = {
	mode: 'production',
	entry: './src/index.tsx',
	plugins: [new PeerDepsExternalsPlugin()],
	output: {
		path: path.resolve('dist'),
		filename: 'main.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				exclude: /(node_modules)/,
				use: 'babel-loader'
			}
		]
	}
}
