var webpack = require('webpack');

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
    // new webpack.ProvidePlugin({
    //   'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    // })
  ],
  module: {
    loaders: [
      {
        test: /\.(jsx?|es6)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
};