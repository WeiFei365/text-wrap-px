var webpack = require('webpack');


module.exports = {
    entry: './examples/main.js',
    output: {
        filename: './dist/bundle.js'
    },
    resolve:{

    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery' // $自动注入到全局
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            drop_console: true,
            compress: {
                warnings: false
            }
        })
    ],
    module:{
        loaders:[
            {
              test: /\.vue$/,
              loader: 'vue'
            },
            {
              test: /\.json$/,
              loader: 'json'
            },
            {
                test:/\.js$/,
                loader: 'babel',
                exclude:/node_modules|picker\.data\.js|picker\.js/
            },
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {test: /\.(png|jpg|gif)$/, loader: 'url' },
            {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'url'}

        ]
    }
}
