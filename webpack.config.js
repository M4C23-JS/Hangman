const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [ new OptimizeCssAssetsWebpackPlugin() ]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: ['style-loader','css-loader',]
            },
            {
                test: /styles\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader',]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes:false,
                    minimize: false,
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                loader: 'file-loader',
                options: {
                    esModule: false
                }

            }
            
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
        }),
        new CopyWebpackPlugin({
            patterns:[
                {from: 'src/assets', to: 'assets/'}
            ]
        })

    ]
}
