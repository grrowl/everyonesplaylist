
var NODE_ENV = process.env['NODE_ENV'],
    webpack = require('webpack'),
    path = require('path'),
    babelConfig = {};

if (NODE_ENV === 'development') {
  // enable HMR
  babelConfig = {
    plugins: [
      ['react-transform', {
        transforms: [{
          transform: 'react-transform-hmr',
          imports: ['react'],
          locals: ['module']
        }]
      }]
    ]
  }
}

module.exports = {
  entry: (
    NODE_ENV === 'development'
    ? [ 'webpack-hot-middleware/client', './client/app.js' ]
    : './client/app.js'
  ),
  output: {
    path: path.resolve('./static'),
    filename: 'client.js'
  },
  recordsPath: path.resolve('webpack.records.json'),
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?'+JSON.stringify(babelConfig)
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  // Speed up incremental builds
  devtool: (NODE_ENV === 'development' ? 'eval' : 'source-map'),
  plugins: (function () {
    var plugins = [];

    switch (NODE_ENV) {
      case 'development':
        plugins.push(
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin()
        );

      // fall through to
      case 'production':
        plugins.push(
          new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch/fetch'
          })
        );
    }

    return plugins;
  })(),
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};
