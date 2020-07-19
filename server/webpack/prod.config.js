const common = require('./webpack.config');

module.exports = {
  ...common,

  // Environment Specific Configurations
  mode: 'production',
};