
var webpack = require('webpack'),
    path = require('path');

module.exports = {
  entry: './client/app.js',
  output: {
    filename: './static/client.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.jsx?$/,
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
