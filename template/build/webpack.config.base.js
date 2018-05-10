const path = require('path')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlPlugin = require('html-webpack-plugin')
const resolve = dir => {
  return path.join(__dirname, '..', dir)
}
const config = {
  target: 'web',
  mode: 'production',
  entry: path.join(__dirname, '../src/main.js'),
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve('src')
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'img/[name].[hash:5].[ext]'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new vueLoaderPlugin()
  ]
}
module.exports = config