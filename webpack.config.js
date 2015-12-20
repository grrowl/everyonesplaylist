
var webpack = require('webpack'),
    path = require('path');

module.exports = {
  entry: './src/client.js',
  output: {
    filename: './static/client.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\/src\/.+\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch/fetch'
    })
  ],
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};
