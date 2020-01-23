const path = require('path');

module.exports = {
  mode: "production",
  entry: './src/scripts/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'js'),
    publicPath: '/js'
}
};