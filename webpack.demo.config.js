const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'demo', 'index.js'),
  output: {
    path: path.join(__dirname, 'demo', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'demo'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        }
      }
    ]
  }
};