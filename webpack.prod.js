const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.png$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        esModule: false
                    }
                }
                ]
            },
            plugins: [
                new HtmlWebPackPlugin({
                    template: "./src/client/views/index.html",
                    filename: "./index.html",
                }),
                new MiniCssExtractPlugin({ filename: "[name].css" })
            ],
            optimization: {
                minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
            },
}
