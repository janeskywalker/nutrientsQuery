const path = require('path');

module.exports = {
  entry: './client/index.js',
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/server/public'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
