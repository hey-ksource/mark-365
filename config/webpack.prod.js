const path = require('path');
const basicConfig = require('./webpack.basic.js');

const resolve = target => path.resolve(__dirname, '..', target);

module.exports = Object.assign({}, basicConfig, {
  mode: 'production',

  plugins: [...basicConfig.plugins]
});
