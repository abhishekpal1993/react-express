const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './server/main.js',
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: '12.6',
                    },
                  },
                ],
              ],
              sourceMaps: 'inline',
              retainLines: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'build', to: 'build' }],
    }),
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'server.bundle.js',
  },
  resolve: {
    alias: {
      'pg-native': 'noop2',
      tedious: 'noop2',
      sqlite3: 'noop2',
      mysql2: 'noop2',
    },
  },
};