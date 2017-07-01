/**
 * Created by zhangsanfeng on 2017/6/26.
 */

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: [
        'webpack/hot/dev-server.js',
        'webpack-dev-server/client?http://localhost:3000',
        './src/index.jsx'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),       //绝对路径
                query: {presets: ['latest']}
            },
            {
                test: /\.jsx$/,
                exclude: path.resolve(__dirname, 'node_modules'),       //绝对路径
                loader: 'babel-loader',
                query: {presets: ['latest','react']}
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader']
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['url-loader?limit=80000&name=assets/[name]-[hash:5].[ext]', 'img-loader']
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: ()=> {
                    return [
                        require('autoprefixer')({
                            browsers: ['last 10 versions', 'ie>=8', '>1% in CN']
                        })
                    ]
                }
            }
        }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     minimize: true,
        //     compress: {warnings: false},
        //     output: {comments: false},
        //     minChunks: Infinity
        // }),

        // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),

        //js代码压缩
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         //supresses warnings, usually from module minification
        //         warnings: false
        //     },
        //     beautify: false,
        //     comments: false
        // }),

        // 分离CSS和JS文件
        // new ExtractTextPlugin('style/[name].[chunkhash:8].css'),

        //css代码压缩
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorOptions: {discardComments: {removeAll: true}},
        //     canPrint: true
        // }),

        // 自动打开浏览器
        new OpenBrowserPlugin({
            url: 'http://localhost:3000'
        })
    ],

    devServer: {
        // historyApiFallback: true,    //不跳转
        hot: true,
        inline: true
    }
};