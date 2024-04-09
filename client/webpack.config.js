const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [     // Added these lines. 
      new HtmlWebpackPlugin({
        template: './index.html',      // These filepaths may not be right. Added these lines. 
        filename: 'index.html',     // These filepaths may not be right. Added these lines. 
      }),     // Added these lines. 
    new WebpackPwaManifest({     // Added these lines. 
      name: 'J.A.T.E',     // Added these lines. 
      short_name: 'J.A.T.E',     // Added these lines. 
      description: 'Just Another Text Editor',     // Added these lines.   Added these lines. 
      background_color: '#ffffff',     // Added these lines. 
      crossorigin: 'use-credentials',     // Added these lines. 
      icons: [{     // Added these lines. 
        src: path.resolve('src/images/logo.png'), // These filepaths may not be right.  Added these lines. 
        sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
      }]     // Added these lines. 
    }),     // Added these lines. 
    new InjectManifest({     // Added these lines. 
      swSrc: './src-sw.js',     // Added these lines. 
      swDest: 'service-worker.js',     // Added these lines. 
    })
    ],
    module: {
      rules: [     // Added these lines. 
        {     // Added these lines. 
          test: /\.css$/,     // Added these lines. 
          use: ['style-loader', 'css-loader']     // Added these lines. 
        },     // Added these lines. 
        {     // Added these lines. 
          test: /\.js$/,     // Added these lines. 
          exclude: /node_modules/,     // Added these lines. 
          use: {     // Added these lines. 
            loader: 'babel-loader',     // Added these lines. 
            options: {     // Added these lines. 
              presets: ['@babel/preset-env']     // Added these lines. 
            }
          }
        }
      ],
    },
  };
};
