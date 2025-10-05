const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../public'), // Root'a build et
    filename: 'static/js/bundle.js',
    publicPath: '/',
    clean: true
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      title: 'SUOAI - Finland Immigration & Integration Platform'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '../public')
    },
    port: 3001,
    open: false,
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};