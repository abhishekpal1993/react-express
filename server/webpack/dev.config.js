const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

const common = require('./webpack.config');

const newPlugins = common.plugins;
newPlugins.push(new NodemonPlugin({
  watch: path.resolve('dist'),
  verbose: true,
}));

module.exports = {
  ...common,
  
  // Environment Specific Configurations
  mode: 'production',
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: ['dist/**/*.js', 'node_modules/**']
  },
  plugins: newPlugins,
};
