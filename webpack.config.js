const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/main_page/index.js',
    devtool: 'sourcemap',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
            },
            {
                test: /\.(jpe?g|png|gif|mp3|svg)$/i,
                loaders: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'main.js',
        publicPath: "dist/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'index.css',
            chunkFilename: '0.css',
        }),
    ],
    devServer: {
        overlay: true,
        hot: true,
        port: 9001,
        proxy: {
            '!(/static/dist/**/**.*)': {
                target: 'http://127.0.0.1:5000',
            },
        }
    }
};
