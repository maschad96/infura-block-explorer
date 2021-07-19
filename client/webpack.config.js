const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
	entry: [
		'react-hot-loader/patch',
		'./src/index.tsx'
	],
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-url-loader',
						options: {
							limit: 10000,
						},
					},
				],
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'postcss-loader'
				]
			},
			{
				test: /\.ts(x)?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				// include: path.resolve(__dirname, '/src/styles/'),
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.tsx',
			'.ts'
		],
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
	},
	devServer: {
		contentBase: './public'
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
		}),
		new MiniCssExtractPlugin()
	],
	optimization: {
		mergeDuplicateChunks: true,
		concatenateModules: true,
		minimize: true
	}
};

module.exports = config;