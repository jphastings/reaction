var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/ComponentRenderer.es6',
  devtool: 'source-map',
  debug: true,
  output: {
    filename: 'examples/public/js/ComponentRenderer.js',
    libraryTarget: 'var',
    library: 'ComponentRenderer'
  },
  plugins: [
    new ExtractTextPlugin('examples/public/css/app.css', {
        allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(jsx?|es6)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          optional: ['es7.decorators']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style',
          'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!' +
          'sass?sourceMap'
        )
      }
    ]
  }
};