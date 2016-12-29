let webpack = require('webpack');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [/node_modules/],
            options: {
                cacheDirectory: true,
                presets: ['es2015']
            }
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: {
                keep_fnames: true
            },
            compress: {
                warnings: false
            }
        })
    ]
}