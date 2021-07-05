const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sveltePreprocess = require('svelte-preprocess');

const resolve = target => path.resolve(__dirname, '..', target);

module.exports = {
  entry: resolve('src'),
  output: {
    path: resolve('dist'),
    filename: '[name].[hash:8].js'
  },
  resolve: {
    alias: {
      src: resolve('src')
    },
    extensions: ['.ts', '.svelte', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(svelte)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-flow'] }
          },
          {
            loader: 'svelte-loader',
            options: {
              emitCss: true,
              preprocess: sveltePreprocess({})
            }
          }
        ]
      },
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-flow'] }
          }
        ]
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/index.html')
    }),
    new MiniCssExtractPlugin()
  ]
};
