const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: 'development',
    entry: {
      draw: './src/js/draw.js',
      methods: './src/js/methods.js',
      opts: './src/js/opts.js',
    },
    output: {
        filename: 'js/[name]-bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)/i,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 5 * 1024
                }
            }
        }, {
            test: /\.scss$/,
	    exclude: /node_modules/,
            use: [
		  {
		    loader: "style-loader" 
		  },
		  {
		    loader: "css-loader" 
		  },
		  {
		    loader: "sass-loader"
		  }
            ]
        }]
    },
    devServer: {
        publicPath: 'src/html',
        contentBase: '.',
        host: 'localhost',
        compress: true,
        port: 8080,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            filename: 'html/index-bundle.html',
            minify: {
	        minimize: true,
		removeConments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
	    }
        }),
        new UglifyjsWebpackPlugin({
            exclude: /node_modules/,
        }),
	new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ],

};
