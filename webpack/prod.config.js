/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [new UglifyJsPlugin()]
    // runtimeChunk: 'single',
    // splitChunks: {
    //   chunks: 'all',
    //   maxInitialRequests: Infinity,
    //   minSize: 0,
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name(module) {
    //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    //         return `npm.${packageName.replace('@', '')}`;
    //       }
    //     }
    //   }
    // }
  },
  plugins: [
    new workboxPlugin.GenerateSW({
      cacheId: 'boilerplate',
      swDest: 'sw.js',
      navigateFallback: '/index.html',
      clientsClaim: true,
      skipWaiting: true
    })
  ]
});
