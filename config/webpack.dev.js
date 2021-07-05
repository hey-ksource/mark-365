const path = require('path');
const basicConfig = require('./webpack.basic.js');

const resolve = target => path.resolve(__dirname, '..', target);

module.exports = Object.assign({}, basicConfig, {
  mode: 'development',
  devServer: {
    port: 2333,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [...basicConfig.plugins]
});
