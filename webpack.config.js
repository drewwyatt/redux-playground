var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
module.exports = {
    context: __dirname,
    entry: {
        'counter': './src/counter/index.ts'
    },
    output: {
        path: __dirname + '/bin',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'}
        ]
    },
    resolve: {
        extensions: ['','.ts','.js','.json']
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    devServer: {
        port: 3000,
        host: "localhost",
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
  }
};

