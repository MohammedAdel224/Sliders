const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'main.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
            exclude: path.resolve(__dirname, 'src/css/main.css'), // Exclude main.css from bundling
        },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        }),
        new CopyWebpackPlugin({
        patterns: [
            { from: 'src/css/main.css', to: 'main.css' }, // Copy main.css to dist/
        ],
        }),
    ],
    mode: 'development', // Change to 'production' when deploying
};
