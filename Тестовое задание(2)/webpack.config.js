const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/scripts/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'js'),
    publicPath: '/js'
},
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 8080
  }
};