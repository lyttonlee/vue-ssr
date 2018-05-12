const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const DefaultPlugins = [
  new HtmlPlugin({
    template: path.join(__dirname, '../index.html'),
    filename: 'index.html',
    inject: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  })
]
let config
const devServer = {
  port: 8080,
  host: '0.0.0.0',
  // open: true,
  overlay: {
    errors: true
  },
  hot: true
}
if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ]
        }
      ]
    },
    devServer: devServer,
    plugins: DefaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../src/client/main.js'),
      vendor: ['vue']
    },
    output: {
      filename: 'static/js/[name].[chunkhash:8].js',
      path: path.join(__dirname, '../dist')
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: DefaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[chunkhash:8].css',
        chunkFilename: 'static/css/[id].[chunkhash:8].css'
      })
    ])
  })
}

module.exports = config
