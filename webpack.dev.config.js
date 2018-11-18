const webpack = require('webpack');
const path = require('path');
const base = require('./webpack.base.config');

base.devtool = 'cheap-module-eval-source-map';

base.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    stats: 'errors-only',
    port: 8888,
    host: '127.0.0.1',
    hot: true,
    overlay: true,
    inline:true
};

base.module.rules[1].use.unshift('style-loader');
base.module.rules[1].use.unshift('css-hot-loader');
base.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin());
const config = {
    ...base
};
module.exports = config;