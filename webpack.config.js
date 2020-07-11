const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './server.mjs',
  mode: 'production',
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.mjs$/,
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
    new CopyPlugin({
      patterns: [{ from: 'build', to: 'build' }],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
  },
};