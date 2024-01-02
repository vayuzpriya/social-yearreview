const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

// const mode = process.env.NODE_ENV || 'development';
const mode = process.env.NODE_ENV || 'production';
const prod = mode === 'production';

module.exports = {
	experiments: {
		topLevelAwait: true
	  },
	entry: {
		'build/bundle': ['./src/main.js']
	},
	resolve: {
		alias: {
			svelte: path.dirname(require.resolve('svelte/package.json'))
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod
					}
				}
			},
			
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 		MiniCssExtractPlugin.loader,
			// 		'css-loader'
			// 	]
			// },
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			  },
			//   {
			// 	test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
			// 	loader: 'url-loader?limit=100000'
			// },
			{
				test: /\.(gif|svg|jpg|png|cur)$/,
				loader: "file-loader",
			  },
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			},
			{
				test: /\.(woff2|woff|eot|ttf|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
				},
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	devtool: prod ? false : 'source-map',
	devServer: {
		hot: true
	}
};
