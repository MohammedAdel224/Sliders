const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const getStarted = fs.readFileSync("./src/components/getStarted.html", "utf8");
const oneSideSlider = fs.readFileSync("./src/components/oneSideSlider.html", "utf8");
const defaultStyle = fs.readFileSync("./src/components/defaultStyle.html", "utf8");

const createConfig = (minify) => ({
    entry: './src/js/index.js',
    output: {
        filename: minify ? 'js/sliders.bundle.min.js' : 'js/sliders.bundle.js', // Generate both minified & unminified JS
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!css/**', '!js/**'],
}),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: "body",
            templateParameters: {
                getStarted: getStarted,
                oneSideSlider: oneSideSlider,
                defaultStyle: defaultStyle,
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: 'src/css/main.css', 
                    to: minify ? 'css/style.min.css' : 'css/style.css'
                }, // Copy exclude CSS
            ],
        }),
        new MiniCssExtractPlugin({ filename: minify ? 'css/sliders.min.css' : 'css/sliders.css' }), // Both versions
    ],
    optimization: minify
        ?   {
                minimize: true,
                minimizer: [`...`, new CssMinimizerPlugin()], // Minify JS & CSS
            }
        :   {
                minimize: false, // No minification for unminified version
            },
    mode: 'production',
});

// Export both configurations (unminified + minified)
module.exports = [createConfig(false), createConfig(true)];