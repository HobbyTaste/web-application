const path = require('path');
const config = require('config');
const CopyPlugin = require('copy-webpack-plugin');

const DESTINATION_DIR = 'dist';

const IS_DEV = process.env.NODE_ENV === 'development';

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
                            modules: {
                                mode: 'local',
                                localIdentName: IS_DEV
                                    ? '[name]__[local]__[hash:base64:5]'
                                    : '[hash:base64:5]'
                            },
                        }
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|mp3|svg|ttf|otf)$/i,
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
        }]),
    ],
};
