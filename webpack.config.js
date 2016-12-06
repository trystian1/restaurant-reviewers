module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
  loaders: [
    {
      test: /.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015'],
      },
    }
  ],
},
}
