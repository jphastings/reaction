module.exports = {
  entry: './ComponentRenderer.es6',
  devtool: 'source-map',
  debug: true,
  output: {
    filename: 'dist/ComponentRenderer.js',
    libraryTarget: 'var',
    library: 'ComponentRenderer'
  },
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