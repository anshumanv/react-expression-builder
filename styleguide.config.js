module.exports = {
	components: 'src/*.js',
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				}
			]
		}
	}
}
