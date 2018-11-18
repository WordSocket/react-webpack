const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清理dist文件夹
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base.config');

base.plugins.push(
    new CleanWebpackPlugin(['dist']),
    new UglifyJSPlugin({
        uglifyOptions: {
            compress: false
        }
    })); //webpack4 该source map默认false
const config = {
    ...base
};
module.exports = config;