const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取样式
const HtmlWebpackPlugin = require('html-webpack-plugin'); //处理html
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin'); //按需加载lodash

// 处理文件入口 及 html文档配置
const buildEntriesAndHTML = () => {
    // 用来构建entery
    const result = glob.sync('src/*.html');
    const config = {
        hash: true,
        inject: true
    };
    const entries = {};
    const htmls = [];
    result.forEach(item => {
        const one = path.parse(item);
        const outputfile = one.name;
        entries[outputfile] = [`./src/js/${outputfile}.js`];
        htmls.push(
            new HtmlWebpackPlugin({
                ...config,
                template: `./${one.dir}/${one.base}`,
                filename: one.base, // 输出html文件的路径
                chunks: [outputfile]
            })
        );
    });
    return {
        entries,
        htmls
    };
};
const final = buildEntriesAndHTML();

const base = {
    entry: final.entries,
    output: {
        filename: () => {
            return 'js/' + '[name].js';
        },
        // publicPath: '/',
        path: __dirname + '/dist' //必须是绝对路径
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                include: '/src', //必须是绝对路径
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true // 使用缓存
                        }
                    }
                ]
            },
            {
                test: /\.scss$/, //匹配的文件类型
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 90000, // size <= 1KB
                            publicPath: './images/', //修改css引用路径
                            outputPath: 'images/'
                        }
                    },
                    // img-loader for zip img
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-gifsicle')({
                                    interlaced: false
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false
                                }),
                                require('imagemin-pngquant')({
                                    quality: '80' // the quality of zip
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            interpolate: 'require'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/' + '[name].min.css'
        }),
        new LodashModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            //加载jq
            $: 'jquery',
            _: 'lodash',
            'jQuery':'jquery'
        }),
        //自动生成index.html文件
        ...final.htmls
    ]
};

module.exports = base;