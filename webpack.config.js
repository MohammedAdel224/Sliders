const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
            { from: 'src/css/main.css', to: 'main.min.css' }, // Copy main.css to dist/
        ],
        }),
        new MiniCssExtractPlugin({ filename: 'sliders.min.css' }),
    ],
    optimization: {
        minimizer: [
          `...`, // Keep existing minimizers (like Terser for JS)
          new CssMinimizerPlugin(), // Minifies CSS
        ],
    },
    mode: 'production', // Change to 'production' when deploying
};
