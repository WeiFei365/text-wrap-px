var webpack = require('webpack');


module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        './examples/main.js'
    ],
    // entry: './src/index.js',
    output: {
        filename:'bundle.js',
        publicPath: '/dist/'
        // path: __dirname + '/dist'
    },
    resolve:{

    },
    devtool:"source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin()
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
