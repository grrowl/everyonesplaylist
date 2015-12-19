var path = require('path');

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
  resolve: {
    alias: {
      fetch: 'whatwg-fetch'
    }
  },
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};
