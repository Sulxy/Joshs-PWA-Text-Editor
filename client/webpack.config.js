const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'J.A.T.E',
    }),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    }),
    new WebpackPwaManifest({
      name: 'J.A.T.E',
      short_name: 'J.A.T.E',
      description: 'Just Another Text Editor',
      background_color: '#ffffff',
      crossorigin: 'use-credentials',
      inject: true,
      fingerprints: false,
      start_url: '/',
      publicPath: '/',
      icons: [{
        src: path.resolve(__dirname, 'src/images/logo.png'), 
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join('assets', 'icons'),
      }]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-object-rest-spread',
              '@babel/transform-runtime'
            ]
          }
        }
      }
    ],
  },
};
