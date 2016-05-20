var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
module.exports = {
    context: __dirname,
    entry: {
        'tests': 'expect',
        'vendor': [
            'react',
            'react-dom',
            'redux',
            'deep-freeze'
        ],
        'counter': './src/counter/index.tsx',
        'counters': './src/counters/index.tsx',
        'todos': './src/todos/index.tsx'
    },
    output: {
        path: __dirname + '/bin',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader'}
        ]
    },
    resolve: {
        extensions: ['', '.ts', '.tsx','.js','.json']
    },
    plugins: [
        new CommonsChunkPlugin("vendor", "vendor.bundle.js", Infinity),
        new HtmlWebpackPlugin({ template: 'src/index.html' })
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

