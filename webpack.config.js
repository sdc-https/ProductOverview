const path = require('path');
const src_dir = path.join(__dirname, '/client/src');
const dist_dir = path.join(__dirname, '/client/dist');
const dotenv = require('dotenv-webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: "development",
  entry: `${src_dir}/index.jsx`,
  output: {
    path: dist_dir,
    filename: "overview.js"
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        include: src_dir,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
    ]
  },
  plugins: [
    new dotenv(),
    new CompressionPlugin()
  ]
}