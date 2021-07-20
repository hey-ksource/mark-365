const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sveltePreprocess = require('svelte-preprocess');

const resolve = target => path.resolve(__dirname, '..', target);

module.exports = {
  entry: resolve('src'),
  output: {
    path: resolve('docs')
  },
  resolve: {
    alias: {
      src: resolve('src'),
      assets: resolve('assets')
    },
    extensions: ['.ts', '.js', '.svelte']
  },
  module: {
    rules: [
      {
        test: /\.(svelte)$/,
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
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-flow'] }
          }
        ]
      },
      {
        test: /\.(jpeg|png)$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 10,
          name: 'assets/[name].[ext]'
        }
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
      template: resolve('public/index.html')
    }),
    new MiniCssExtractPlugin()
  ]
};
