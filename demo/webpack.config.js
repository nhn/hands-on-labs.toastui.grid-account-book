'use strict';

var pkg = require('./package.json');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProduction = process.argv.indexOf('-p') > -1;

var FILENAME = pkg.name + (isProduction ? '.min.js' : '.js');

module.exports = {
    eslint: {
        failOnError: isProduction
    },
    entry: './src/js/index.js',
    output: {
        path: 'dist',
        publicPath: 'dist',
        filename: FILENAME
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /(test|node_modules|bower_components)/,
                loader: 'eslint-loader'
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style-loader', ['css-loader'])
            },
            {
                test: /\.png/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(pkg.name + '.css')
    ],
    devServer: {
        historyApiFallback: false,
        progress: true,
        host: '0.0.0.0',
        disableHostCheck: true
    }
};
