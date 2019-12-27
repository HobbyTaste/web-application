const path = require('path');
const config = require('config');
const CopyPlugin = require('copy-webpack-plugin');

const DESTINATION_DIR = 'dist';

module.exports = {
    entry: './static/index.js',
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
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|mp3|svg)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    output: {
        path: path.join(__dirname, DESTINATION_DIR),
        filename: 'main.js',
        publicPath: `${config.get('static.baseUrl')}/`
    },
    plugins: [
        new CopyPlugin([{
            from: 'public/images/favicon.ico',
        }])
    ]
};
